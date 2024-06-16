import React from 'react';

const DocumentPage = () => {
    const apiEndpoints = [
        {
            number: 1,
            endpoint: '/POST',
            uri: 'localhost:3000/actividades/',
            description: 'Endpoint para registrar una actividad en la base de datos',
            method: 'POST',
            header: 'Content-Type: JSON',
            users: 'Encargado',
            requestJSON: {
                id_actividad: 'ID INT',
                fecha_actividad: 'date',
                descripcion: 'string/text',
                fk_mantenimiento: 'ID INT',
                fk_tecnico: 'ID INT',
            },
            response: {
                correct: {
                    status: 200,
                    body: {
                        message: 'Actividad registrada correctamente',
                        data: [
                            {
                                fieldCount: 0,
                                affectedRows: 1,
                                insertId: 37,
                                info: '',
                                serverStatus: 2,
                                warningStatus: 0,
                                changedRows: 0
                            }
                        ]
                    }
                },
                incorrect: {
                    status: 403,
                    body: {
                        message: 'Error al registrar Actividad'
                    }
                }
            }
        },
        {
            number: 2,
            endpoint: '/GET',
            uri: 'localhost:3000/actividades/',
            description: 'Endpoint para listar las actividades registradas en la base de datos',
            method: 'GET',
            users: 'Administrador/Encargado',
            response: {
                correct: {
                    status: 200,
                    body: [
                        {
                            id_actividad: 'ID INT',
                            fecha_actividad: 'date',
                            descripcion: 'string/text',
                            fk_mantenimiento: 'ID INT',
                            fk_tecnico: 'ID INT'
                        }
                    ]
                },
                incorrect: {
                    status: 404,
                    body: {
                        message: 'No se encontraron Actividades'
                    }
                }
            }
        },
        {
            number: 3,
            endpoint: '/GET/:id',
            uri: 'localhost:3000/actividades/',
            description: 'Endpoint para buscar una actividad en la base de datos por su ID',
            method: 'GET',
            users: 'Encargado',
            response: {
                correct: {
                    status: 200,
                    body: {
                        id_actividad: 'ID INT',
                        fecha_actividad: 'date',
                        descripcion: 'string/text',
                        fk_mantenimiento: 'ID INT',
                        fk_tecnico: 'ID INT'
                    }
                },
                incorrect: {
                    status: 404,
                    body: {
                        message: 'No se encontraron Actividades'
                    }
                }
            }
        },
        {
            number: 4,
            endpoint: '/PUT/:id',
            uri: 'localhost:3000/actividades/',
            description: 'Endpoint para actualizar los datos de una actividad en la base de datos',
            method: 'PUT',
            users: 'Administrador/Encargado',
            header: 'Content-Type: JSON',
            requestJSON: {
                id_actividad: 'ID INT',
                fecha_actividad: 'date',
                descripcion: 'string/text',
                fk_mantenimiento: 'ID INT',
                fk_tecnico: 'ID INT'
            },
            response: {
                correct: {
                    status: 200,
                    body: {
                        message: 'Actividad actualizada correctamente',
                        categoria: [
                            {
                                fieldCount: 0,
                                affectedRows: 1,
                                insertId: 0,
                                info: 'Rows matched: 1 Changed: 1 Warnings: 0',
                                serverStatus: 2,
                                warningStatus: 0,
                                changedRows: 1
                            },
                            null
                        ]
                    }
                },
                incorrect: {
                    status: 403,
                    body: {
                        message: 'Error al actualizar Actividad',
                        error: {
                            // Muestra las características del error
                        }
                    }
                }
            }
        }
    ];

    return (
        <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Documentación API
                </h1>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    ¡Tu Mejor Amigo en Casa!
                </h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200 rounded-md shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-bold text-gray-900">Número</th>
                            <th className="py-3 px-6 text-left text-sm font-bold text-gray-900">Nombre endpoint</th>
                            <th className="py-3 px-6 text-left text-sm font-bold text-gray-900">URI</th>
                            <th className="py-3 px-6 text-left text-sm font-bold text-gray-900">Descripción</th>
                            <th className="py-3 px-6 text-left text-sm font-bold text-gray-900">Verbo HTTP</th>
                            <th className="py-3 px-6 text-left text-sm font-bold text-gray-900">Header</th>
                            <th className="py-3 px-6 text-left text-sm font-bold text-gray-900">Usuarios</th>
                            <th className="py-3 px-6 text-left text-sm font-bold text-gray-900">Request JSON</th>
                            <th className="py-3 px-6 text-left text-sm font-bold text-gray-900">Response</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {apiEndpoints.map((endpoint, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="py-4 px-6">{endpoint.number}</td>
                                <td className="py-4 px-6">{endpoint.endpoint}</td>
                                <td className="py-4 px-6">{endpoint.uri}</td>
                                <td className="py-4 px-6">{endpoint.description}</td>
                                <td className="py-4 px-6">{endpoint.method}</td>
                                <td className="py-4 px-6">{endpoint.header || '-'}</td>
                                <td className="py-4 px-6">{endpoint.users}</td>
                                <td className="py-4 px-6">
                                    {endpoint.requestJSON ? (
                                        <pre className="whitespace-pre-wrap">{JSON.stringify(endpoint.requestJSON, null, 2)}</pre>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td className="py-4 px-6">
                                    <ul className="list-disc list-inside">
                                        <li>
                                            <span className="font-semibold text-gray-800">Correcto:</span> <br />
                                            status: {endpoint.response.correct.status} <br />
                                            Body: <br />
                                            {endpoint.response.correct.body && (
                                                <pre className="whitespace-pre-wrap">{JSON.stringify(endpoint.response.correct.body, null, 2)}</pre>
                                            )}
                                        </li>
                                        <li>
                                            <span className="font-semibold text-gray-800">Incorrecto:</span> <br />
                                            status: {endpoint.response.incorrect.status} <br />
                                            Body: <br />
                                            {endpoint.response.incorrect.body && (
                                                <pre className="whitespace-pre-wrap">{JSON.stringify(endpoint.response.incorrect.body, null, 2)}</pre>
                                            )}
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DocumentPage;
