function getFullNameLength(name: string) {
  if (name.length === 0)
    name = 'John'

  let lastName = 'Doe';

  name = `${name} + ${lastName}`;

  return name.toUpperCase();
}