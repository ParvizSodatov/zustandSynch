import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { UseSynchTodo } from './store/store'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
export default function App() {
	const { data, del, add, edit, complete } = UseSynchTodo()
	// add
	const [openAdd, setOpenAdd] = useState(false)
	const [addName, setAddName] = useState('')
	const [addAge, setAddAge] = useState('')
	const [addStatus, setAddStatus] = useState('')

	// edit
	const [openEdit, setOpenEdit] = useState(false)
	const [editName, setEditName] = useState('')
	const [editAge, setEditAge] = useState('')
	const [editStatus, setEditStatus] = useState('')
	const [idx, setIdx] = useState(false)

	const handleEditClickOpen = row => {
		setOpenEdit(true)
		setEditName(row.name)
		setEditAge(row.age)
		setEditStatus(row.status)
		setIdx(row.id)
	}
	const handleEdit = () => {
		let newEditUser = {
			id: idx,
			name: editName,
			age: editAge,
			status: editStatus,
		}
		edit(newEditUser)
		setOpenEdit(false)
	}

	const handleEditClose = () => {
		setOpenEdit(false)
	}

	const handleAddClickOpen = () => {
		setOpenAdd(true)
	}

	const handleAddClose = () => {
		setOpenAdd(false)
	}

	const handleAdd = () => {
		let newAddUser = {
			id: Date.now(),
			name: addName,
			age: addAge,
			status: addStatus,
		}
		add(newAddUser)
	}
	return (
		<>
			<Button variant='outlined' onClick={handleAddClickOpen}>
				Open form dialog
			</Button>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Dessert (100g serving)</TableCell>
							<TableCell align='right'>Calories</TableCell>
							<TableCell align='right'>Fat&nbsp;(g)</TableCell>
							<TableCell align='right'>Carbs&nbsp;(g)</TableCell>
							<TableCell align='right'>Protein&nbsp;(g)</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map(row => (
							<TableRow
								key={row.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th' scope='row'>
									{row.id}
								</TableCell>
								<TableCell align='right'>{row.name}</TableCell>
								<TableCell align='right'>{row.age}</TableCell>
								<TableCell align='right'>
									{row.status == true ? 'Active' : 'Inactive'}
								</TableCell>
								<TableCell align='right'>
									<div>
										<button
											onClick={() => del(row.id)}
											style={{ backgroundColor: 'red', color: 'white' }}
										>
											delet
										</button>
										<button
											onClick={() => handleEditClickOpen(row)}
											style={{ backgroundColor: 'blue', color: 'white' }}
										>
											edit
										</button>
										<input
											type='checkbox'
											checked={row.status}
											onClick={() => complete(row)}
										/>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* addModal */}
			<Dialog
				open={openAdd}
				onClose={handleAddClose}
				slotProps={{
					paper: {
						component: 'form',
						onSubmit: event => {
							event.preventDefault()
							const formData = new FormData(event.currentTarget)
							const formJson = Object.fromEntries(formData.entries())
							const email = formJson.email
							console.log(email)
							handleAddClose()
						},
					},
				}}
			>
				<DialogTitle>Subscribe</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email address here.
						We will send updates occasionally.
					</DialogContentText>
					<TextField
						autoFocus
						required
						margin='dense'
						id='name'
						name='name'
						label='Add Name'
						type='text'
						value={addName}
						onChange={e => setAddName(e.target.value)}
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						required
						margin='dense'
						id='name'
						name='name'
						label='Add Age'
						type='text'
						value={addAge}
						onChange={e => setAddAge(e.target.value)}
						fullWidth
						variant='standard'
					/>
					<select
						value={addStatus}
						onChange={e => setAddStatus(e.target.value === 'true')}
					>
						<option value='false'>Inactive</option>
						<option value='true'>Active</option>
					</select>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAddClose}>Cancel</Button>
					<Button type='submit' onClick={handleAdd}>
						Subscribe
					</Button>
				</DialogActions>
			</Dialog>

			{/* editModal */}
			<Dialog
				open={openEdit}
				onClose={handleEditClose}
				slotProps={{
					paper: {
						component: 'form',
						onSubmit: event => {
							event.preventDefault()
							const formData = new FormData(event.currentTarget)
							const formJson = Object.fromEntries(formData.entries())
							const email = formJson.email
							console.log(email)
							handleEditClose()
						},
					},
				}}
			>
				<DialogTitle>Subscribe</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email address here.
						We will send updates occasionally.
					</DialogContentText>
					<TextField
						autoFocus
						required
						margin='dense'
						id='name'
						name='name'
						label='Add Name'
						type='text'
						value={editName}
						onChange={e => setEditName(e.target.value)}
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						required
						margin='dense'
						id='name'
						name='name'
						label='Add Age'
						type='text'
						value={editAge}
						onChange={e => setEditAge(e.target.value)}
						fullWidth
						variant='standard'
					/>
					<select
						value={editStatus}
						onChange={e => setEditStatus(e.target.value === 'true')}
					>
						<option value='false'>Inactive</option>
						<option value='true'>Active</option>
					</select>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAddClose}>Cancel</Button>
					<Button type='submit' onClick={handleEdit}>
						Subscribe
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
