import sys
import requests
from bs4 import BeautifulSoup

print("Hello, World!")

print(sys.argv[1])

res = requests.get('http://bridges-clone.herokuapp.com')
html = BeautifulSoup(res.text, "html.parser")
print(html)

sys.exit(1)

sum = 0

for i in range (1, 10000000):
    sum += i

print (sum)

sys.exit(0)
sys.stderr.write("AN ERRORR")
# sys.stdout.flush()
