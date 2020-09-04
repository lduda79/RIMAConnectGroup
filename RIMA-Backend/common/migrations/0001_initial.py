# Generated by Django 2.2.3 on 2020-04-15 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='TaskLog',
            fields=[
                (
                    'id',
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name='ID',
                    ),
                ),
                ('name', models.CharField(max_length=255)),
                (
                    'status',
                    models.CharField(
                        choices=[
                            ('running', 'running'),
                            ('completed', 'completed'),
                            ('failed', 'failed'),
                        ],
                        max_length=255,
                    ),
                ),
                ('started_on', models.DateTimeField(auto_now_add=True, null=True)),
                ('ended_on', models.DateTimeField(auto_now=True, null=True)),
                (
                    'duration_seconds',
                    models.DecimalField(
                        blank=True, decimal_places=1, max_digits=6, null=True
                    ),
                ),
                ('args', models.TextField(blank=True, null=True)),
                ('kwargs', models.TextField(blank=True, null=True)),
                ('error_stack', models.TextField(blank=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, db_index=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True)),
            ],
            options={'verbose_name_plural': 'Task Logs'},
        )
    ]
