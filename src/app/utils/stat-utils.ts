export class StatUtils {
  public static findMedian(arr: number[]): number {
    if (!arr || arr.length === 0) { return null; }

    const isOdd = arr.length % 2 !== 0;
    const middle = Math.floor(arr.length / 2);

    arr.sort(StatUtils.compare);

    if (!isOdd) {
      return (arr[middle] + arr[middle - 1]) / 2;
    }

    return arr[middle];
  }

  public static findAverage(arr: number[]): number {
    if (!arr || arr.length === 0) { return null; }

    return arr.reduce((sum, curr) => sum + curr) / arr.length;
  }

  private static compare(a, b) {
    if (a < b) {
      return -1;
    } else {
      return 1;
    }
  }
}
