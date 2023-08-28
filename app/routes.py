from app import app, db
from flask import render_template, redirect, url_for, flash, request
from app.forms import LoginForm, SignUpForm, PointsForm
from app.models import User
from flask_login import login_user, logout_user, login_required, current_user

@app.route('/', methods = ['GET', 'POST'])
def index():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = db.session.execute(db.select(User).where(User.username==username)).scalar()
        if user is not None and user.check_password(password):
            login_user(user)
            flash("You have successfully logged in" , "success")
            return redirect(url_for('home'))
        
    elif form.is_submitted():
        flash("Your passwords did not match", "danger")
        return redirect(url_for('index'))
    
    # Sign Up

    form2 = SignUpForm()
    if form2.validate_on_submit():
        first_name = form2.first_name.data
        last_name = form2.last_name.data
        username = form2.username.data
        email = form2.email.data
        password = form2.password.data
        
        check_user = db.session.execute(db.select(User).where( (User.username==username) | (User.email==email) )).scalar()
        if check_user:
            flash('A user with that username already exists', 'danger')
            return redirect(url_for('index'))
        
        new_user = User(first_name = first_name, last_name = last_name, username = username, email = email, password = password, points = 0, turns = 0)

        db.session.add(new_user)
        db.session.commit()
        flash(f'{new_user.username} has been created', 'success')

        login_user(new_user)
  
        return redirect(url_for('home'))
    
    return render_template('index.html', form = form, form2 = form2)

@app.route('/logout', methods = ['GET', 'POST'])
def logout():
    logout_user()
    flash("You have successfully logged out", "success")
    return redirect(url_for('index'))

@app.route('/home', methods = ['GET'])
def home():
    users = db.session.execute(db.select(User)).scalars().all() 
    return render_template('home.html', users = users)

@app.route('/game', methods = ['GET', 'POST'])
def game():

    form = PointsForm()
    if form.validate_on_submit():
        current_user.points = int(form.points.data)
        current_user.turns = form.turns.data
        
        db.session.commit()
        flash(f'Congrats, {current_user.first_name} {current_user.last_name}. Your points have been submitted.', 'success')
        return redirect(url_for('home'))

    return render_template('game.html', form = form, current_user = current_user)