import { NgbDateStruct, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";

export const formatToLocalDateTime = (date: NgbDateStruct, time: Partial<NgbTimeStruct>): string => {
    const year = date.year.toString();
    const month = date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    const hour = (time.hour ?? 0).toString().padStart(2, '0');
    const minute = (time.minute ?? 0).toString().padStart(2, '0');
    const second = (time.second ?? 0).toString().padStart(2, '0'); // Optional, defaults to "00" if not set

    // Construct string in "yyyy-MM-dd HH:mm:ss" format
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};