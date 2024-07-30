const FormToServer = require('./Form.js');

describe('FormToServer', () => {
  test('Отечественное физическое лицо', () => {
    const input = {
      isForeign: false,
      isJuridical: false,
      title: 'Ксения Молчанова',
      tin: '1234567890',
    }
    const output = {
      type: 'physical',
      tin: '1234567890',
      name: 'Ксения Молчанова',
      foreign_tin: null,
      company_title: null,
    }
    expect(FormToServer(input)).toEqual(output)
  })

  test('Отечественное юридическое лицо', () => {
    const input = {
      isForeign: false,
      isJuridical: true,
      title: 'ООО "Лиса"',
      tin: '0987654321',
    }
    const output = {
      type: 'juridical',
      tin: '0987654321',
      name: null,
      foreign_tin: null,
      company_title: 'ООО "Лиса"',
    }
    expect(FormToServer(input)).toEqual(output)
  })

  test('Иностранное физическое лицо', () => {
    const input = {
      isForeign: true,
      isJuridical: false,
      title: 'Fisical corp',
      tin: 'FKDJDHRT5',
    }
    const output = {
      type: 'foreign_physical',
      tin: null,
      name: 'Fisical corp',
      foreign_tin: 'FKDJDHRT5',
      company_title: null,
    }
    expect(FormToServer(input)).toEqual(output)
  })

  test('Иностранное юридическое лицо', () => {
    const input = {
      isForeign: true,
      isJuridical: true,
      title: 'Hello world Corp',
      tin: 'HFJFYD67SH5',
    }
    const output = {
      type: 'foreign_juridical',
      tin: null,
      name: null,
      foreign_tin: 'HFJFYD67SH5',
      company_title: 'Hello world Corp',
    }
    expect(FormToServer(input)).toEqual(output)
  })

  test('Не заполнен ИНН для иностранного контрагента', () => {
    const input = {
      isForeign: true,
      isJuridical: false,
      title: 'Fisical corp',
      tin: '',
    }
    const output = {
      type: 'foreign_physical',
      tin: null,
      name: 'Fisical corp',
      foreign_tin: '',
      company_title: null,
    }
    expect(FormToServer(input)).toEqual(output)
  })

  test('Не заполнены названия/имени', () => {
    const input = {
      isForeign: false,
      isJuridical: false,
      title: '',
      tin: '1223334444',
    }
    const output = {
      type: 'physical',
      tin: '1223334444',
      name: '',
      foreign_tin: null,
      company_title: null,
    }
    expect(FormToServer(input)).toEqual(output)
  })
})
