import httplib2
import json
MERCEDES_API = {
    "PROTOCOL": "https:",
    "HOSTNAME": "api.secure.mercedes-benz.com"
}

MERCEDES_CLIENT = {
    "ID": "5f5459be-74ea-4e7e-86e1-71f9349abc4a",
    "SECRET": "43ce0f4b-bce0-482f-9e4d-2180bd30ebcd",
    "access_token": "fd1a8fd0-e5dc-4dbe-941a-a313740ef0bd",
}

TOKENS = {
    "access_token": "fd1a8fd0-e5dc-4dbe-941a-a313740ef0bd",
    "token_type": "Bearer",
    "expires_in": 3600,
    "refresh_token": "d6bea208-aafd-4d4b-920a-f0bcfab84c74",
    "scope": "mb:vehicle:status:general mb:user:pool:reader"
}

VECHICLE = "7DCF6CF3B96B2E3442"
ENCODED = "NWY1NDU5YmUtNzRlYS00ZTdlLTg2ZTEtNzFmOTM0OWFiYzRhOjQzY2UwZjRiLWJjZTAtNDgyZi05ZTRkLTIxODBiZDMwZWJjZA=="


headers = {'accept': 'application/json',
           'authorization': ' Bearer {}'.format(TOKENS["access_token"])}

resp, content = httplib2.Http().request(
    "https://api.mercedes-benz.com/experimental/connectedvehicle/v1/vehicles/{}/location".format(VECHICLE), headers=headers)

print(content)


refresh_url = "https://api.secure.mercedes-benz.com/oidc10/auth/oauth/v2/token"

refresh_headers = {"content-type": "application/x-www-form-urlencoded",
                   "authorization": "Basic"}

data = {"grant_type": "refresh_token", "refresh_token":TOKENS["refresh_token"]}

resp, content = httplib2.Http().request(
    "https://api.secure.mercedes-benz.com/oidc10/auth/oauth/v2/token", method="POST", headers=refresh_headers, body=bytes(json.dumps(data), encoding="utf-8") )

print(content)