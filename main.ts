input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    modules.calliopeMotorM0.run(50)
    modules.calliopeMotorM1.run(100)
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    modules.calliopeMotorM0.run(100)
    modules.calliopeMotorM1.run(-100)
})
