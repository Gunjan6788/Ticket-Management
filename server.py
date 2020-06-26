from flask import Flask
from flask import request
from flask_mysqldb import MySQL
import math
import json
import jwt

app = Flask(__name__)


app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Eshwer@12'
app.config['MYSQL_DB'] = 'ticket_manage'

mysql = MySQL(app)

## login user or company #### 
@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    role = request.json['role']
    flag = False
    
    if role=='company':
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM company''')
        res = cur.fetchall()
        user_id = 0
        name = ''

        for row in res:
            if row[2]==email and row[3]==password:
                flag = True
                user_id = row[0]
                name = row[1]

        if flag == True:
            payload = {'email':email,"password":password}
            key = 'secret'
            encode_jwt = jwt.encode(payload,key)
            return {'auth_token': encode_jwt.decode(),'role':role,'id':user_id,'message':'logged_in','name':name}
        else:
            return {'auth_Token':False,'message':'incorrect email or password'}

    elif role=='user':
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM user''')
        res = cur.fetchall()
        user_id = 0
        name = ''

        for row in res:
            if row[2]==email and row[3]==password:
                flag = True
                user_id = row[0]
                name = row[1]

        if flag == True:
            payload = {'email':email,"role":role}
            key = 'secret'
            encode_jwt = jwt.encode(payload,key)
            return {'auth_token': encode_jwt.decode(),'role':role,'id':user_id,'message':'logged_in','name':name}
        else:
            return {'auth_Token':False,'message':'incorrect email or password'}
    
    return {'auth_Token':False,'message':'incorrect email or password'}

## signup user or company
@app.route('/signup', methods=['POST'])
def signup_both():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    role = request.json['role']

    if role == 'company':
        cur = mysql.connection.cursor()
        cur.execute('''INSERT INTO company(name,email,password) VALUES ("%s","%s","%s")'''%(name,email,password))
        mysql.connection.commit()
        cur.close()

        return {"message":"company signup successfully"}
    elif role == 'user':
        cur = mysql.connection.cursor()
        cur.execute('''INSERT INTO user(name,email,password) VALUES ("%s","%s","%s")'''%(name,email,password))
        mysql.connection.commit()
        cur.close()

        return {"message":"user signup successfully"}

## company details 
@app.route('/company_details')
def company_details():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM company''')
    res = cur.fetchall()
    data = []

    for row in res:
        info = {
            "id":row[0],
            "name":row[1]
        }
        data.append(info)
    data = list(data)
    return json.dumps({"data":data})

## add ticket from user
@app.route('/add_ticket',methods=['POST'])
def add_ticket():
    title = request.json['title']
    category = request.json['category']
    priority = request.json['priority']
    company_id = request.json['company']
    user_id = request.json['user_id']

    cur = mysql.connection.cursor()
    cur.execute('''INSERT INTO ticket(title,status,priority,user_id,company_id,category) VALUES ("%s","assign","%s",%d,%d,"%s")'''%(title,priority,int(user_id),int(company_id),category))
    mysql.connection.commit()
    cur.close()

    return json.dumps({"message":"Ticket created successfully"})


## all tickets of user
@app.route('/ticket_report/<user_id>')
def ticket_report(user_id):
    user_id = int(user_id)
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM ticket JOIN company ON ticket.company_id=company.id WHERE user_id=%d'''%(user_id))
    res = cur.fetchall()
    data = []

    for row in res:
        info = {
            "id":row[0],
            "title":row[1],
            "status":row[2],
            "category":row[6],
            "company":row[8],
            "company_id":row[5]
        }
        data.append(info)

    data = list(data)
    return json.dumps({"data":data})


## function for pagination
def pagination(page, per_page, total):
    total_pages = math.ceil(total/per_page)
    prev_page_end = (page-1) * per_page
    cur_page_end = page * per_page

    return [prev_page_end,cur_page_end,total_pages]


## all tickets of company
@app.route('/view_tickets')
def view_tickets():
    company_id = request.args.get("company_id")
    company_id = int(company_id)
    page = request.args.get("page",default=1,type=int)
    per_page = request.args.get("per_page", default=5,type=int)

    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM ticket AS t JOIN user AS u ON t.user_id=u.id WHERE t.company_id=%d'''%(company_id))
    res = cur.fetchall()
    data = []

    for row in res:
        info = {
            "id":row[0],
            "title":row[1],
            "status":row[2],
            "priority":row[3],
            "category":row[6],
            "name": row[8]
        }
        data.append(info)

    total = len(data)
    res = pagination(page,per_page,total)
    data = data[res[0]:res[1]]

    return json.dumps({"data":data,"total_pages":res[2],"curr_page":page})

## update status of the ticket
@app.route('/change_status/<ticket_id>/<status>')
def change_status(ticket_id,status):
    ticket_id = int(ticket_id)
    cur = mysql.connection.cursor()
    cur.execute('''UPDATE ticket SET status="%s" WHERE id=%d'''%(status,ticket_id))
    mysql.connection.commit()
    cur.close()

    return "status updated successfully"

## edit the imformation by the user
@app.route('/ticket_update', methods=['POST'])
def ticket_update():
    ticket_id = request.json['ticket_id']
    title = request.json['title']
    category = request.json['category']
    priority = request.json['priority']
    company_id = request.json['company']
    
    cur = mysql.connection.cursor()
    cur.execute('''UPDATE ticket SET title="%s", company_id=%d, priority="%s", category="%s" WHERE id=%d'''%(title,company_id,priority,category,ticket_id))
    mysql.connection.commit()
    cur.close()

    return "ticket updated successfully"


## get all comments
@app.route('/get_comments/<ticket_id>')
def get_comments(ticket_id):
    ticket_id = int(ticket_id)
    
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM comment WHERE ticket_id=%d'''%(ticket_id))
    res = cur.fetchall()
    data = []

    for row in res:
        info = {
            "id":row[0],
            "comment":row[1],
            "comment_by":row[2],
            "comment_time":row[3]
        }
        data.append(info)

    data = list(data)
    return json.dumps({'data':data},default=str)


## add comments by user and company
@app.route('/add_comment', methods=['POST'])
def add_comment():
    comment = request.json['comment']
    comment_by = request.json['comment_by']
    comment_time = request.json['comment_time']
    ticket_id = int(request.json['ticket_id'])

    cur = mysql.connection.cursor()
    cur.execute('''INSERT INTO comment(comment,comment_by,comment_time,ticket_id) VALUES ("%s","%s","%s",%d)'''%(comment,comment_by,comment_time,ticket_id))
    mysql.connection.commit()
    cur.close

    return 'comment addes successfully'
