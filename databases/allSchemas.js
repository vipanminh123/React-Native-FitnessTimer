
import Realm from 'realm';

export const TIMER_SCHEMA = 'Timer';

export const TimerSchema = {
    name: TIMER_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        sets: 'string',
        work_minute: 'string',
        work_seconds: 'string',
        rest_minute: 'string',
        rest_seconds: 'string',
    }
}

const databaseOptions = {
    path: 'fitnessTimerApp.realm',
    schema: [TimerSchema],
    schemaVersion: 1
}

export const insertNewTimer = (newTimer) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(TIMER_SCHEMA, newTimer);
            resolve(newTimer);
        })
    }).catch((error) => reject(error));
});

export const updateTimer = (timer) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updatingTimer = realm.objectForPrimaryKey(TIMER_SCHEMA, timer.id);
            updatingTimer.sets = timer.sets;
            updatingTimer.work_minute = timer.work_minute;
            updatingTimer.work_seconds = timer.work_seconds;
            updatingTimer.rest_minute = timer.rest_minute;
            updatingTimer.rest_seconds = timer.rest_seconds;
            resolve();
        })
    }).catch((error) => reject(error));
});

export const deleteTimer = (timer) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingTimer = realm.objectForPrimaryKey(TIMER_SCHEMA, timer.id);
            realm.delete(deletingTimer);
            resolve();
        })
    }).catch((error) => reject(error));
});

export const queryTimer = (id) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let query_Timer = realm.objectForPrimaryKey(TIMER_SCHEMA, id);
            resolve(query_Timer);
        })
    }).catch((error) => reject(error));
});

export const queryAllTimer = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allTimer = realm.objects(TIMER_SCHEMA);
            resolve(allTimer);
        })
    }).catch((error) => reject(error));
});

export default new Realm(databaseOptions);