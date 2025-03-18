from flask import render_template, jsonify, request
from datetime import datetime
from app import app

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', current_year=datetime.now().year)

@app.route('/about')
def about():
    return render_template('about.html', current_year=datetime.now().year)

@app.route('/contact')
def contact():
    return render_template('contact.html', current_year=datetime.now().year)

@app.route('/experience')
def experience():
    return render_template('experience.html', current_year=datetime.now().year)

@app.route('/api/experience')
def get_experience():
    experiences = [
        {
            "title": "Software Engineer - SSA Team, FRCSE",
            "company": "FRCSE",
            "period": "February 2024 - Present",
            "skills": ["Python", "JavaScript", "PowerShell", "HTML", "GUI Development"],
            "type": "government",
            "description": [
                "Led HTM to HTML conversion initiative using Python 3, JavaScript and PowerShell 7",
                "Developed GUI tool for markdown to HTML conversion",
                "Improved CASS and E-CASS testing processes",
                "Streamlined RTCASS OS image builds"
            ]
        },
        {
            "title": "Web Application Developer",
            "company": "RSR Group INC",
            "period": "September 2021 - April 2023",
            "skills": ["Python", "Django", "JIRA", "GitLab", "SQL"],
            "type": "private",
            "description": [
                "Built internal web software using Python 3 and Django",
                "Managed projects using JIRA",
                "Created custom business reports",
                "Maintained high code quality standards through GitLab repository"
            ]
        },
        {
            "title": "Backend Developer Lead",
            "company": "PatientNow",
            "period": "April 2021 - September 2021",
            "skills": ["SQL", "Python", "Sisense", "Database Management"],
            "type": "private",
            "description": [
                "Engineered SQL queries using Sisense analytics",
                "Unified disparate databases for streamlined reporting",
                "Optimized data models using Python",
                "Monitored database builds in real time"
            ]
        },
        {
            "title": "Software Engineer",
            "company": "PatientNow",
            "period": "January 2021 - April 2021",
            "skills": ["Python", "JavaScript", "SaaS", "Bluefin", "API Integration"],
            "type": "private",
            "description": [
                "Integrated SaaS web software with Bluefin payment services",
                "Developed secure Python scripts to resolve data anomalies",
                "Led defect ticket triage and maintenance team processes"
            ]
        },
        {
            "title": "Junior Software Engineer",
            "company": "RX Marketing",
            "period": "February 2019 - December 2020",
            "skills": ["SQL", "PostgreSQL", "CRUD", "Testing", "Database Management"],
            "type": "private",
            "description": [
                "Automated testing processes and bug resolution workflows",
                "Built Task Manager CRUD system for Social Patient Center",
                "Managed SQL and PostgreSQL databases for optimal performance"
            ]
        }
    ]
    
    skill_filter = request.args.get('skill', '').lower()
    type_filter = request.args.get('type')
    
    filtered_experiences = experiences.copy()
    
    # Add matched flag to experiences
    for exp in filtered_experiences:
        if skill_filter:
            exp['matched'] = any(skill_filter in skill.lower() for skill in exp['skills'])
        else:
            exp['matched'] = True
            
    if type_filter:
        filtered_experiences = [exp for exp in filtered_experiences if exp['type'] == type_filter]
        
    return jsonify(filtered_experiences)