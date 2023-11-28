import requests
import os
from dotenv import load_dotenv
from django.conf import settings
from django.core.management.base import BaseCommand
from home.models import FileStats


class Command(BaseCommand):
    help = "Check if files uploaded to sever has virus"

    def handle(self, *args, **options):
        """Handler function to check if file is malicious"""

        """Load envirnment variables from .env file"""
        load_dotenv()

        VIRUS_TOTAL_API_KEY = os.getenv("VIRUS_TOTAL_API_KEY")

        headers = {
            "x-apikey": VIRUS_TOTAL_API_KEY,
        }
        url = {
            "upload_url": "https://www.virustotal.com/api/v3/files",
            "analysis_url": "https://www.virustotal.com/api/v3/analyses/",
        }

        """ Scan dirctory to get each files"""
        for root, dirs, files in os.walk(settings.MEDIA_ROOT, topdown=True):
            if len(files) > 0:
                for file in files:
                    file_path = os.path.join(root, file)
                    """Read binary into a file object"""
                    file_obj = {"file": open(file_path, "rb")}

                    """ Upload file to virusapi server"""
                    response = requests.post(
                        url["upload_url"], files=file_obj, headers=headers
                    )
                    file_id = response.json()["data"]["id"]

                    """Uploaded file analysis"""
                    response = requests.get(
                        url["analysis_url"] + file_id, headers=headers
                    )

                    file_name, extension = file.split(".")
                    data = {
                        "name": file_name,
                        "extension": extension,
                        "sha256": response.json()["meta"]["file_info"]["sha256"],
                        "sha1": response.json()["meta"]["file_info"]["sha1"],
                        "md5": response.json()["meta"]["file_info"]["md5"],
                        "size": response.json()["meta"]["file_info"]["size"],
                        "is_malicious": response.json()["data"]["attributes"]["stats"][
                            "malicious"
                        ]
                        > 0,
                    }
                    try:
                        if not FileStats.objects.filter(name=file_name).exists():
                            FileStats.objects.create(**data)

                            self.stdout.write("Object Created sucessfully")
                        else:
                            self.stdout.write("Object already exist")
                    except:
                        self.stdout.write("Could not create object")
