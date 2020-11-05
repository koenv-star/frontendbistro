export class coordinateTool {

  public static coordinatesToDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // km
    let dLat = coordinateTool.toRad(lat2-lat1);
    let dLon = coordinateTool.toRad(lon2-lon1);
    lat1 = coordinateTool.toRad(lat1);
    lat2 = coordinateTool.toRad(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  public static toRad(value: number): number {
    return value * Math.PI / 180;
  }
}
