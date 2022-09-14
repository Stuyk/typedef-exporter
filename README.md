# Typedef Exporter

This repository is to parse TypeDef files and extract specific information from them to help generate documentation. 

It's very opinionated and not all TypeDef files may work for this program outright.

## Currently a Work In Progress. Stay Tuned.

**Example Output of Functions**

```json
[
        {
                "name": "getServerConfig",
                "arguments": [],
                "isExported": true,
                "returnType": "IServerConfig"
        },
        {
                "name": "getVehicleModelInfoByHash",
                "arguments": [
                        {
                                "key": "vehicleHash",
                                "value": "number"
                        }
                ],
                "isExported": true,
                "returnType": "IVehicleModel"
        },
        {
                "name": "getRemoteEventListeners",
                "arguments": [
                        {
                                "key": "eventName",
                                "value": "string | null",
                                "comment": "eventName Name of the event or null for generic event."
                        }
                ],
                "isExported": true,
                "returnType": "((...args: any[]) => void)[]",
                "comments": ""
        },
        {
                "name": "stopResource",
                "arguments": [
                        {
                                "key": "name",
                                "value": "string",
                                "comment": "name Name of the resource."      
                        }
                ],
                "isExported": true,
                "returnType": "void",
                "comments": "Stops the specified resource."
        },
        {
                "name": "restartResource",
                "arguments": [
                        {
                                "key": "name",
                                "value": "string",
                                "comment": "name Name of the resource."      
                        }
                ],
                "isExported": true,
                "returnType": "void",
                "comments": "Restarts the specified resource."
        }
]
```