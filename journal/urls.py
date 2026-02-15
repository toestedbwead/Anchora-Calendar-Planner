from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EntryViewSet, ProgressViewSet

router = DefaultRouter()
router.register(r'entries', EntryViewSet, basename='entry')
router.register(r'progress', ProgressViewSet, basename='progress')

urlpatterns = [
    path('', include(router.urls)),
]