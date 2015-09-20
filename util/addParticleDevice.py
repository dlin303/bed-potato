from pymongo import MongoClient
import sys

if (len(sys.argv) != 3):
  print "Usage: <email> <device_id>"
  sys.exit()

email = sys.argv[1]
device_id = sys.argv[2]

connection = MongoClient("localhost", 3001)
meteorDb = connection.meteor

user = meteorDb.users.find_one({"emails.address" : email}, {"_id" : True})
if not user:
  print "Could not find user with that email"
  sys.exit()

print "Entering new device id for user: " + user['_id']
result = meteorDb.particleInfo.update_one({ "userId": user['_id'] }, { "$set": { "device_id": device_id } })

if result.matched_count == 1:
  print "Success"
else:
  print "update failed"

