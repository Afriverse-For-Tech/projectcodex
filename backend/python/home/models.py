from django.db import models
import os


# Create your models here.
class UploadedFile(models.Model):
    class Meta:
        ordering = ["date_uploaded"]
        db_table = "Files"

    # owner = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to="uploads/")
    date_uploaded = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # If the title is not set, use the name of the uploaded file (excluding extension)
        if not self.title:
            self.title = os.path.splitext(os.path.basename(self.file.name))[0]

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class FileStats(models.Model):
    """This model stores the analysis of the files and some file info"""

    name = models.CharField(max_length=300, unique=True)
    extension = models.CharField(max_length=20)
    sha256 = models.CharField(max_length=64, unique=True)
    sha1 = models.CharField(max_length=40, unique=True)
    md5 = models.CharField(max_length=32, unique=True)
    size = models.IntegerField()
    is_malicious = models.BooleanField()
