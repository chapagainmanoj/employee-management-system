from milkyway.settings.common import *
# import dj_database_url

DEBUG = True


ALLOWED_HOSTS += ['127.0.0.1', 'milkyway2020.herokuapp.com']

INSTALLED_APPS = [
    'whitenoise.runserver_nostatic',
] + INSTALLED_APPS

MIDDLEWARE = [
	'django.middleware.security.SecurityMiddleware',
 'whitenoise.middleware.WhiteNoiseMiddleware',
] + MIDDLEWARE

WHITENOISE_USE_FINDERS = True
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# db_from_env = dj_database_url.config(conn_max_age=500)
# DATABASES['default'].update(db_from_env)


