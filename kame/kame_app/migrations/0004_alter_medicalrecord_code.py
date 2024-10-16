# Generated by Django 4.2 on 2024-10-07 19:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("kame_app", "0003_vitalsigns_patient_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="medicalrecord",
            name="Code",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="kame_app.icd10",
            ),
        ),
    ]
