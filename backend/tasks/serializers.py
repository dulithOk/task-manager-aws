from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    attachment_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'attachment', 'attachment_url', 'created_at']
        read_only_fields = ['id', 'created_at', 'attachment_url']

    def get_attachment_url(self, obj):
        request = self.context.get('request')
        if not obj.attachment:
            return None
        if request:
            return request.build_absolute_uri(obj.attachment.url)
        return obj.attachment.url
