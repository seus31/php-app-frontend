"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import AdminLayout from '../../components/AdminLayout'

const Notes: React.FC = () => {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(15)
    const [notes, setNotes] = useState<NoteType[]>([])
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const accessToken = localStorage.getItem('token')
                setToken(accessToken)
                const param = { page: page, per_page: perPage }
                const options = {
                    method: 'GET',
                    url: 'http://localhost:8181/api/v1/notes',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    data: param,
                }

                axios(options)
                    .then((response: { data: {data: NoteType[] }}) => {
                        setNotes(response.data.data)
                    })
                    .catch((error: unknown) => {
                        router.push('/auth/login')
                    })
                //setLoading(false)
            } catch (error) {
                console.error('Error fetching notes:', error)
                //setLoading(false)
            }
        }

        fetchNotes().then(() => {})
    }, [])

    const handleDelete = (id: number) => {
        if (confirm('ノートを削除しますか？')) {
            const options = {
                method: 'DELETE',
                url: 'http://localhost:8181/api/v1/notes/' + id,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            }

            axios(options)
                .then(() => {
                    window.location.reload()
                })
                .catch((error) => console.error(error))
        }
    }

    return (
        <AdminLayout>
            <h2>ノート一覧</h2>
            <Button className="mb-3" onClick={() => router.push('/admin/notes/create')}>
                ノートの追加
            </Button>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>カテゴリ</th>
                    <th>タイトル</th>
                    <th>本文</th>
                    <th>作成日</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {notes.map((note: NoteType) => (
                    <tr key={note.id}>
                        <td>{note.id}</td>
                        <td>{note.category_id}</td>
                        <td>{note.title}</td>
                        <td>{note.body}</td>
                        <td>{note.created_at}</td>
                        <td>
                            <Button
                                variant="info"
                                size="sm"
                                className="me-2"
                                onClick={() => router.push(`/dashboard/${note.id}`)}
                            >
                                詳細
                            </Button>
                            <Button
                                variant="warning"
                                size="sm"
                                className="me-2"
                                onClick={() => router.push(`/dashboard/${note.id}/edit`)}
                            >
                                編集
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(note.id)}>
                                削除
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </AdminLayout>
    )
}

export default Notes
