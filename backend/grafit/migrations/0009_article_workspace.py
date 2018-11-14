# Generated by Django 2.1.3 on 2018-11-14 13:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('grafit', '0008_workspace'),
    ]

    operations = [
        migrations.RunSQL("""
            INSERT INTO grafit_workspace (id, name, initials)
            VALUES (1, 'Software Development', 'SW')
            ON CONFLICT DO NOTHING
            """),
        migrations.AddField(
            model_name='article',
            name='workspace',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='grafit.Workspace'),
            preserve_default=False,
        ),
    ]
