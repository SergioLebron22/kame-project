from kame_app.models import VitalSigns, Patient

# Find and delete orphaned VitalSigns records
orphaned_vitals = VitalSigns.objects.filter(
    patient_id__isnull=True
) | VitalSigns.objects.exclude(patient_id__in=Patient.objects.all())

orphaned_vitals.delete()
