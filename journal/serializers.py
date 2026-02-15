from rest_framework import serializers
from .models import Entry

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ['id', 'date', 'description', 'reflections', 'mood', 'category', 'created_at']


class ProgressSerializer(serializers.Serializer):
    month = serializers.CharField()
    category_breakdown = serializers.DictField()
    mood_by_day = serializers.ListField(
        child=serializers.DictField()
    )
    days_with_activity = serializers.IntegerField()
    total_days_in_month = serializers.IntegerField()
    activity_percentage = serializers.FloatField()