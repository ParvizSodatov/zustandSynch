import { create } from 'zustand'

export const UseSynchTodo = create(set => ({
	data: [
		{
			id: '1',
			name: 'Amin',
			age: '12',
			status: false,
		},
		{
			id: '3',
			name: 'Adis',
			age: '20',
			status: true,
		},
		{
			id: '4',
			name: 'Said',
			age: '24',
			status: false,
		},
	],
	del: id => set(state => ({ data: state.data.filter(el => el.id != id) })),
	add: user => set(state => ({ data: [...state.data, user] })),
	edit: user =>
		set(state => ({
			data: state.data.map(el => (el.id == user.id ? user : el)),
		})),
	complete: user =>
		set(state => ({
			data: state.data.map(el =>
				el.id == user.id ? { ...el, status: !el.status } : el
			),
		})),
}))
