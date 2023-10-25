//% deprecated
namespace motors { }

namespace modules {
    /**
     * Calliope mini dualmotor 1
     */
    //% fixedInstance whenUsed block="calliope motors"
    export const CalliopeMotors = new DualMotorsClient("calliope motors?dev=self&srvo=0&name=M0M1")
}

namespace servers {
    function sync(server: jacdac.Server, motor: Motor) {
        const speed = server.value
        const enabled = !!server.intensity
        if (speed === 0 || isNaN(speed) || !enabled) {
            motors.brakeMotor(motor)
        } else
            motors.dualMotorPower(motor, speed * 100)
        }
    

    function start() {
        jacdac.productIdentifier = 0x3cadc101
        jacdac.deviceDescription = "Calliope Motor"
        jacdac.startSelfServers(() => [
            jacdac.createActuatorServer(
                jacdac.SRV_DUAL_MOTORS,
                (server) => sync(server, Motor.AB), {
                instanceName: "A",
                    valuePackFormat: jacdac.DualMotorsRegPack.Speed,
                    intensityPackFormat: jacdac.DualMotorsRegPack.Enabled,
            })
        ])
    }
    start()
}