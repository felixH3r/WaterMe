import utime
import machine
import urequests
import network
import ujson
import wifimgr


SENSOR_ID = 2
SENSOR_MAX = 725  # sensor placed in air
SENSOR_MIN = 268  # sensor placed in a glass of water
SERVER_URL = 'https://glossy-mason-313319.ey.r.appspot.com/sensor'
SLEEP_TIME = 60 * 1000  # sleep for 1 minute between measurements


def deep_sleep(msecs):
    # configure RTC.ALARM0 to be able to wake the device
    rtc = machine.RTC()
    rtc.irq(trigger=rtc.ALARM0, wake=machine.DEEPSLEEP)
    # set RTC.ALARM0 to fire after Xmilliseconds, waking the device
    rtc.alarm(rtc.ALARM0, msecs)
    # put the device to sleep
    machine.deepsleep()


def main():
    counter = 0
    # get wlan
    wlan = wifimgr.get_connection()
    # print(wlan.ifconfig())
    # if wlan ist not working, try again for 10 times
    while wlan.isconnected() is False and counter <= 10:
        print("Waiting for connection")
        # wlan = wifimgr.get_connection()
        utime.sleep(2)
        counter += 1

    if counter < 10:
        print("Error while connecting")
    else:
        # get sensor-data
        adc = machine.ADC(0)
        water_level = adc.read()
        # calculate percentage
        water_level = 100 - (water_level - SENSOR_MIN) * 100.0 / (SENSOR_MAX - SENSOR_MIN)
        # send to backend
        msg = ujson.dumps({"waterlevel": water_level, "id": SENSOR_ID})
        header = {"content-type": "application/json; charset=utf-8"}

        try:
            r = urequests.request('POST', SERVER_URL, headers=header, data=msg)
            print(r.text)
        except OSError as e:
            print("Did not work... - ErrNo: " + str(e))

    # stop wlan
    wlan.disconnect()
    # go to sleep now for given amount of ms
    deep_sleep(SLEEP_TIME)


if __name__ == '__main__':
    main()
