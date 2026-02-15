from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Entry
from .serializers import EntrySerializer, ProgressSerializer

# EntryViewSet
class EntryViewSet(viewsets.ModelViewSet):
    serializer_class = EntrySerializer

    def get_queryset(self): 
        month_str = self.request.GET.get('month')

        if not month_str:
            return Entry.objects.all()
        
        year, month = month_str.split('-')
        year = int(year)
        month = int(month)

        return Entry.objects.filter(
            date__year=year,
            date__month=month
        )

# ProgressView
class ProgressViewSet(viewsets.ViewSet):
    def list(self, request):
        month_str = request.GET.get('month')

        if not month_str:
            return Response({"error:" "month parameter required"})
            
        year, month = month_str.split('-')
        year = int(year)
        month = int(month)

        entries = Entry.objects.filter(date__year=year,date__month=month)

        # category breakdown  logic
        coding_count = entries.filter(category='coding').count()
        chores_count = entries.filter(category='household_chores').count()
        errands_count = entries.filter(category='outside_errands').count()
        hangouts_count = entries.filter(category='hangouts').count()
        gaming_count = entries.filter(category='gaming').count()

        category_breakdown = {
            'Coding': coding_count,
            'Household Chores': chores_count,
            'Outside Errands': errands_count,
            'Hangouts': hangouts_count,
            'Gaming': gaming_count
        }

        # mood by day logic

        mood_by_day = []

        for entry in entries:
            mood_by_day.append({
                "date": entry.date,
                "mood": entry.mood
            })
            

        # days with activity  logic
        days_with_activity = entries.count()

        # total days in a month  logic
        days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        total_days_in_month = days_in_month[month - 1]

        # activity percentage  logic

        activity_percentage = (days_with_activity / total_days_in_month) * 100

        data = {
            'month': month_str,
            'category_breakdown': category_breakdown,
            'mood_by_day': mood_by_day,
            'days_with_activity': days_with_activity,
            'total_days_in_month': total_days_in_month,
            'activity_percentage': activity_percentage
        }

        serializer = ProgressSerializer(data)
        return Response(serializer.data)