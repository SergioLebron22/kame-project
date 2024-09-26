from .settings import *
from dotenv import load_dotenv
import os

load_dotenv()


SECRET_KEY = os.getenv('SECRET_KEY')
DEBUG = False
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')


DATABASES = {
    'default': {
        'ENGINE': os.getenv('DB_ENGINE', 'django.db.backends.postgresql'),
        'NAME': os.getenv('DB_NAME', 'kame'),
        'USER': os.getenv('DB_USER', 'postgres'),
        'PASSWORD': os.getenv('DB_PASSWORD', ''),
        'HOST': os.getenv('ALLOWED_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}
