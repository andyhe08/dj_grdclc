# Generated by Django 3.2.4 on 2021-06-30 00:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Data',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('course', models.CharField(max_length=100)),
                ('isCategory', models.CharField(choices=[('Y', 'Yes'), ('N', 'No')], max_length=1)),
                ('catNum', models.IntegerField()),
                ('assignNum', models.IntegerField(null=True)),
                ('name', models.CharField(max_length=100, null=True)),
                ('weight', models.CharField(max_length=5, null=True)),
                ('yourScore', models.CharField(max_length=5, null=True)),
                ('totalScore', models.CharField(max_length=5, null=True)),
            ],
        ),
    ]
