import sys
import json
import requests
from bs4 import BeautifulSoup

base_url = 'http://api.genius.com'
api_token = 'Bearer {}'.format(sys.argv[1])
headers = {'Authorization': api_token}


def get_genius_api_path(search_term, artist=None):
    search_url = '{}/search'.format(base_url)
    data = {}
    if artist is not None:
        data = {'q': '{} {}'.format(artist, search_term)}
    else:
        data = {'q': search_term}

    response = requests.get(url=search_url, params=data, headers=headers)
    json = response.json()

    if artist is not None:
        for hit in json["response"]["hits"]:
            if hit["result"]["primary_artist"]["name"].lower() == artist.lower():
                return hit["result"]["api_path"]

        sys.stderr.write("No results matching the terms '{} {}'".format(search_term, artist))
        sys.exit(1)
    else:
        hits = json.get('response').get('hits')
        if len(hits) > 0:
            top = hits[0]
            if top is not None:
                return top.get('result').get('api_path')

        sys.stderr.write("No results matching the term '{}'".format(search_term))
        sys.exit(1)
        

def get_response_json(api_path):
    song_url = base_url + api_path
    return requests.get(song_url, headers=headers).json()


def get_song_json(json):
    return json.get('response').get('song')


def get_album_name(json):
    json_album = json.get('album')
    if json_album is not None:
        return json_album.get('name')
    return None


def get_release_date(json):
    return json.get('release_date')


def get_artist_name(json):
    json_artist = json.get('primary_artist')
    if json_artist is not None:
        return json_artist.get('name')
    return None


def lyrics_from_song_json(json):
    path = json.get('path')
    page_url = "http://genius.com{}".format(path)
    page = requests.get(page_url)
    html = BeautifulSoup(page.text, "html.parser")
    [h.extract() for h in html('script')]
    lyrics = html.find('div', class_="lyrics").get_text()
    return lyrics


search_term = sys.argv[2]
artist = None
if sys.argv[3] is not "":
    artist = sys.argv[3]

resp_json = get_response_json(get_genius_api_path(search_term, artist))
song_json = get_song_json(resp_json)

json_data = {}
release_date = get_release_date(song_json)
if release_date is not None:
    json_data['release_date'] = release_date

artist_name = get_artist_name(song_json)
if artist_name is not None:
    json_data['artist'] = artist_name

album_name = get_album_name(song_json)
if album_name is not None:
    json_data['album'] = album_name

lyrics = lyrics_from_song_json(song_json)
if lyrics is not None:
    json_data['lyrics'] = lyrics

print(json.dumps(json_data))
sys.exit(0)
