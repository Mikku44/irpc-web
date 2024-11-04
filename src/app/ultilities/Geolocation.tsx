export async function getLocation(): Promise<{ status: string; msg: string; LatLng: number[] | null }> {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const crd = pos.coords;
                resolve({
                    status: "OK",
                    msg: "Success to get location",
                    LatLng: [crd.latitude, crd.longitude]
                });
            },
            (err) => {
                resolve({
                    status: "ERROR",
                    msg: `ERROR(${err.code}): ${err.message}`,
                    LatLng: null
                });
            },
            options
        );
    });
}
