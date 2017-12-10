from django.contrib.auth.decorators import login_required
from django.db import transaction


class LoginRequiredMixin:
    """要求用户登录的功能补充逻辑"""
    @classmethod
    def as_view(cls, **initkwargs):
        view = super().as_view(**initkwargs)
        return login_required(view)


class TransactionAtomicMixin:
    """支持事务的操作"""
    @classmethod
    def as_view(cls, **initkwargs):
        view = super(TransactionAtomicMixin, cls).as_view(**initkwargs)
        return transaction.atomic(view)
