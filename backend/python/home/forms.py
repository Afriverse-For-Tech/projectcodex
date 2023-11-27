from django import forms
from .models import UploadedFile


class UploadedFileForm(forms.ModelForm):
    class Meta:
        model = UploadedFile
        fields = ["file"]
        labels = {'file': 'Title'}
