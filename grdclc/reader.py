from .models import Data


def getClassName(data):
    return data.split("|")[0]


def saveData(request, data):
    dataSplit = data.split("|")
    userID = request.user.id
    className = dataSplit[0]
    dataSplit.pop(0)
    dataSplit.pop(len(dataSplit) - 1)

    for row in dataSplit:
        sR = row.split("~")
        tD = Data()
        tD.username = userID
        tD.course = className
        tD.isCategory = sR[0]
        tD.catNum = sR[1]
        tD.assignNum = sR[2]
        tD.name = sR[3]
        tD.weight = sR[4]
        tD.yourScore = sR[5]
        tD.totalScore = sR[6]
        tD.save()
