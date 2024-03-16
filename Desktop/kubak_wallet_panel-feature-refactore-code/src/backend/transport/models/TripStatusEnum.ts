/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export enum TripStatusEnum {
    TIMEOUT = 'Timeout',
    WAITING = 'Waiting',
    ACCEPTED = 'Accepted',
    RESERVE = 'Reserve',
    ARRIVE = 'Arrive',
    START = 'Start',
    STOP = 'Stop',
    CONTINUE = 'Continue',
    END = 'End',
    COMPLETED = 'Completed',
    CANCELED_AFTER_START = 'CanceledAfterStart',
    CANCELED_AFTER_ARRIVE = 'CanceledAfterArrive',
    CANCELED_AFTER_RESERVE = 'CanceledAfterReserve',
    REQUEST_CANCELED = 'RequestCanceled',
}
