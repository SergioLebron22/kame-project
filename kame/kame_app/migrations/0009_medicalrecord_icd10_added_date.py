# Generated by Django 5.0.6 on 2024-10-28 01:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kame_app', '0008_alter_patient_last_visited'),
    ]

    operations = [
        migrations.AddField(
            model_name='medicalrecord',
            name='icd10_added_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
