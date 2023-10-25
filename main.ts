//% deprecated
namespace motors { }

namespace modules {
    /**
     * Calliope mini motor M0
     */
    //% fixedInstance whenUsed block="makerbit motor M0"
    export const calliopeMotorM0 = new MotorClient("calliope motor M0?dev=self&srvo=0&name=M0")
    /**
     * Calliope mini motor M1
     */
    //% fixedInstance whenUsed block="calliope motor M1"
    export const calliopeMotorM1 = new MotorClient("calliope motor M1?dev=self&srvo=1&name=M1")
}

namespace servers {
    function sync(server: jacdac.Server, motor: Motor) {
        const speed = server.value
        const enabled = !!server.intensity
        if (speed === 0 || isNaN(speed) || !enabled) {
            motors.brakeMotor(motor)
            } else {
            motors.dualMotorPower(motor, Math.abs(speed) * 100)
        }
    }

    function start() {
        jacdac.productIdentifier = 0x3cadc101
        jacdac.deviceDescription = "MakerBit Motor"
        jacdac.startSelfServers(() => [
            jacdac.createActuatorServer(
                jacdac.SRV_MOTOR,
                (server) => sync(server, Motor.A), {
                instanceName: "M0",
                valuePackFormat: jacdac.MotorRegPack.Speed,
                intensityPackFormat: jacdac.MotorRegPack.Enabled,
            }),
            jacdac.createActuatorServer(
                jacdac.SRV_MOTOR,
                (server) => sync(server, Motor.B), {
                instanceName: "M0", valuePackFormat: jacdac.MotorRegPack.Speed,
                intensityPackFormat: jacdac.MotorRegPack.Enabled,
            }),
        ])
    }
    start()
}