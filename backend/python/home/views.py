from django.shortcuts import render, redirect
from .forms import UploadedFileForm


# Create your views here.
def index(request):
    if request.method != "POST":
        form = UploadedFileForm()
        return render(request, "home/upload_here.html", {'form': form})
    else:
        form = UploadedFileForm(request.POST, request.FILES)
        if form.is_valid():
            file_name = request.FILES['file'].name
            form.instance.title = file_name.split('.')[0]  # Using the name without the extension
            form.save()
            return redirect("result")
        return render(request, "home/upload_here.html", {'form': form})


def result(request):
    return render(request, "home/result.html")
