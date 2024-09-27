from django.db import connections
from django.core.exceptions import ObjectDoesNotExist
'''
    This function connects to kames database to fetch
    the icd10 code based on its description.
'''


def get_foreign_key(description):
    '''tries to connect and fetch the code by description.

    Args:
        description (str): Disease name

    Raises:
        ObjectDoesNotExist: if description does not get a match raises this error

    Returns:
        string: code id from icd10
    '''
    try:
        with connections['default'].cursor() as cursor:
            cursor.execute("SELECT code FROM icd10 WHERE description = %s", [description])
            row = cursor.fetchone()
            if row:
                return row[0]
            else:
                raise ObjectDoesNotExist("ICD10 code not found.")
    except Exception as e:
        print(f"ERROR: {e}")
        return None

