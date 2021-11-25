module.exports = (plop) => {
	plop.setGenerator('hook', {
		description: 'New Hook',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Hook Name',
			},
		],
		actions: () => {
			return [
				{
					type: 'add',
					path: 'src/{{camelCase name}}/{{camelCase name}}.ts',
					templateFile: 'plop-templates/hook-index.hbs',
				},
				{
					type: 'add',
					path: 'src/{{camelCase name}}/__tests__/dom.ts',
					templateFile: 'plop-templates/hook-dom-test.hbs',
				},
				{
					type: 'add',
					path: 'src/{{camelCase name}}/__tests__/ssr.ts',
					templateFile: 'plop-templates/hook-ssr-test.hbs',
				},
				{
					type: 'append',
					path: 'src/index.ts',
					separator: '',
					pattern: /;\n$/,
					template:
						"export { {{camelCase name}} } from './{{camelCase name}}/{{camelCase name}}';\n",
				},
			];
		},
	});
};
