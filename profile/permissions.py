from rest_framework import permissions

class IsAdminOrIsSelf(permissions.BasePermission):
    """
    Only allow staff to access the users and let the current user access themselves
    """
    def has_object_permissions(self, request, view, obj):
        if request.user:
            return request.user.is_staff or obj.user == request.user
        return False
