
import requests
import os


OVERPASS_URL = os.getenv("OVERPASS_URL")


def find_leads(
    niche: str,
    location: str,
    limit: int = 20
):
    # Map common business niches to OpenStreetMap categories
    category_map = {
        "gym": ('leisure', 'fitness_centre'),
        "gyms": ('leisure', 'fitness_centre'),
        "dentist": ('amenity', 'dentist'),
        "dental clinics": ('amenity', 'dentist'),
        "restaurant": ('amenity', 'restaurant'),
        "restaurants": ('amenity', 'restaurant'),
        "cafe": ('amenity', 'cafe'),
        "cafes": ('amenity', 'cafe'),
        "pharmacy": ('amenity', 'pharmacy'),
        "salon": ('shop', 'hairdresser'),
        "school": ("amenity", "school"),
        "schools": ("amenity", "school"),
        "college": ("amenity", "college"),
        "colleges": ("amenity", "college"),
        "hospital": ("amenity", "hospital"),
        "hospitals": ("amenity", "hospital"),
    }

    key, value = category_map.get(
        niche.strip().lower(),
        ('amenity', niche.strip().lower())
    )

    # Find the requested location using Nominatim
    geo_response = requests.get(
        "https://nominatim.openstreetmap.org/search",
        params={
            "q": location,
            "format": "json",
            "limit": 1,
        },
        headers={
            "User-Agent": "LeadForgeAI/1.0 (local development)"
        },
        timeout=20,
    )
    geo_response.raise_for_status()

    places = geo_response.json()

    if not places:
        return []

    area = places[0]
    # Use the location's bounding box instead of a 10 km radius
    south, north, west, east = map(
        float, area["boundingbox"]
    )

    query = f"""
    [out:json][timeout:25];
    (
      nwr["{key}"="{value}"](
        {south},{west},{north},{east}
      );
    );
    out center tags;
    """

    
# Try multiple public Overpass servers
    overpass_servers = [
        "https://overpass-api.de/api/interpreter",
        "https://overpass.kumi.systems/api/interpreter",
        "https://overpass.private.coffee/api/interpreter",
    ]

    response = None
    last_error = None

    for server in overpass_servers:
        try:
            candidate = requests.post(
                server,
                data={"data": query},
                headers={
                    "User-Agent": "LeadForgeAI/1.0 (development)"
                },
                timeout=60,
            )

            candidate.raise_for_status()
            response = candidate
            break

        except requests.RequestException as exc:
            last_error = exc

    if response is None:
        raise RuntimeError(
            f"All Overpass servers failed. Last error: {last_error}"
        )


    results = []
    seen = set()

    for item in response.json().get("elements", []):
        tags = item.get("tags", {})
        name = tags.get("name")

        if not name:
            continue

        website = tags.get("website") or tags.get("contact:website")
        phone = tags.get("phone") or tags.get("contact:phone")

        unique_id = (name.lower(), website or "")

        if unique_id in seen:
            continue

        seen.add(unique_id)

        results.append({
            "place_id": f"osm-{item['type']}-{item['id']}",
            "business_name": name,
            "website": website,
            "address": ", ".join(
                filter(None, [
                    tags.get("addr:street"),
                    tags.get("addr:city"),
                    tags.get("addr:postcode"),
                ])
            ),
            "phone": phone,
            "status": "discovered",
        })

        if len(results) >= limit:
            break

    return results
