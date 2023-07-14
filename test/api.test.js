const { expect } = require('chai');
const axios = require('axios');
const { faker } = require('@faker-js/faker');

describe('Тестируем пользователей', () => {
	it.only('Нельзя создать пользователя с не правильноым паролем (axios)', async () => {
		try {
			await axios.post('https://bookstore.demoqa.com/Account/v1/User', {
				"userName": "string",
				"password": "string"
			});
		} catch (error) {
			expect(error.response.status).to.be.equal(400);
			expect(error.response.status).not.to.be.equal(200);
			expect(error.response.data).to.be.deep.equal({
				"code": "1300",
				"message": "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
			});
		}
	});

	it.only('Нельзя создать пользователя с не правильноым паролем (fetch api)', async () => {
		let user = {
			userName: "string",
			password: "string"
		};
		let response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(user)
		});
		const errorData = await response.json()
		expect(response.status).to.be.equal(400);
		expect(response.status).not.to.be.equal(200);
		expect(errorData).to.be.deep.equal({
			"code": "1300",
			"message": "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
		});
	});

	it('Нельзя создать пользователя, если имя уже занято', async () => {
		try {
			await axios.post('https://bookstore.demoqa.com/Account/v1/User', {
				"userName": "Jon",
				"password": "P@ssw0rd"
			});
		} catch (error) {
			expect(error.response.status).not.to.be.equal(200);
			expect(error.response.data.code).to.be.equal('1204');
		}
	});

	it('Создание аккаунта', async () => {
		const userName = faker.internet.userName();
		const response = await axios.post('https://bookstore.demoqa.com/Account/v1/User', {
			userName,
			"password": "P@ssw0rd"
		});
		expect(response.status).to.be.equal(201);
		expect(response.data.username).to.be.equal(userName);
	});

	it('Получение токена', async () => {
		const response = await axios.post('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
			userName: "Jon",
			password: "P@ssw0rd"
		});
		expect(response.data.token).to.be.a('string');
	})
})