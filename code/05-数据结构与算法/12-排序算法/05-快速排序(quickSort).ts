import {swap, testSort} from "hy-algokit";

/**
 * 核心思想:
 * 1.把整个数组分成若干个子数组
 * 2.找到数组中的基准元素，一般为第一个元素或者最后
 * 3.定义双指针： i, j
 * 4.从左侧开始，向右移动i指针，找到 >= 基准元素的值 ，
 *  并且从右向左同时移动 j 指针，找到 < 基准元素的值，
 * 最后 2个值进行交换操作，小的值放在左边，大的值放在右边
 * 5.当 i > = j时， 结束寻找，并且把基准元素放在当前 i 的位置上进行交换
 * 6.在对上面左右数组进行递归操作，重复，返回数组
 */
function quickSort(arr: number[]): number[] {
    //传入 i指针和 就指针的值
    partition(0, arr.length - 1);

    function partition(left: number, right: number) {
        //当left 与right交叉时结束递归
        if (left >= right) return;

        //定义基准元素pivot,取数组中最后一个元素
        let pivot = arr[right];
        //定义i , j指针
        let i = left;
        let j = right - 1;
        while (i <= j) {
            //i是找大于pivot的元素，所以这里是为了获取，大于pivot的坐标
            while (arr[i] < pivot) {
                i++;
            }
            //j是找小于pivot的元素，所以这里是为了获取，小于于pivot的坐标
            while (arr[j] > pivot) {
                j--;
            }

            //在这里获取大于pivot 和小于pivot值的下标,进行交换

            if (i <= j) {
                swap(arr, i, j);
                //这里是一次查找，i++, j--是为了准备下一次查找
                i++;
                j--;
            }
        }

        //i > j 的逻辑，需要把pivot元素与 i的值下标的元素进行交换，在进行下一次递归
        swap(arr, i, right);

        //进行递归操作，对左右2个数组，进行快速递归操作
        partition(left, j);
        partition(i, right);
    }

    return arr;
}

testSort(quickSort);
