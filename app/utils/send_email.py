# coding:utf-8
import logging
from flask_mail import Message
from threading import Thread
from app import mail
from manage import app


def async_send_email(app, msg):
    with app.app_context():
        try:
            mail.send(msg)
        except Exception as e:
            logging.error(e)


def send_email_thread(subject, to, content):
    msg = Message(subject=subject, recipients=[to], html=content)
    thread = Thread(target=async_send_email,args=(app, msg))
    thread.start()
