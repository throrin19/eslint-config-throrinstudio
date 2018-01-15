# Throrinstudio Javascript Styleguide

## Table of Content

<!-- MDTOC maxdepth:6 firsth1:2 numbering:0 flatten:0 bullets:1 updateOnSave:1 -->

- [Table of Content](#table-of-content)   
- [Installation](#installation)   
- [Utilisation](#utilisation)   
- [Types](#types)   
- [References](#references)   
- [Objects](#objects)   
- [Arrays](#arrays)   
- [Destructuring](#destructuring)   
- [Strings](#strings)   
- [Functions](#functions)   
- [Arrow Functions](#arrow-functions)   
- [Classes et Constructeurs](#classes-et-constructeurs)   
- [Modules (uniquement pour projets Front pour le moment)](#modules-uniquement-pour-projets-front-pour-le-moment)   
- [Iterators et Generators](#iterators-et-generators)   
- [Properties](#properties)   
- [variables](#variables)   
- [Hoisting](#hoisting)   
- [Comparison Operators & Equality](#comparison-operators-equality)   
- [Blocks](#blocks)   
- [Commentaires](#commentaires)   
- [Whitespaces](#whitespaces)   
- [Virgules](#virgules)   
- [Points-virgules](#points-virgules)   
- [Type Casting & Coercion](#type-casting-coercion)   
- [Convention de nommage](#convention-de-nommage)   
- [Accessors](#accessors)   
- [Events](#events)   
- [jQuery](#jquery)   
- [VueJS](#vuejs)
- [Performance](#performance)   
- [Resources](#resources)   

<!-- /MDTOC -->

## Installation

```bash
npm install -DE eslint babel-eslint eslint-plugin-html eslint-plugin-import vue-eslint-parser eslint-plugin-vue eslint-config-throrinstudio
    
# or
yarn add -D eslint babel-eslint eslint-plugin-html eslint-plugin-import vue-eslint-parser eslint-plugin-vue eslint-config-throrinstudio
```

## Utilisation

Plusieurs choix s'ouvrent à vous en fonction du type de projet utilisé. Vous devrez, pour chacun créer le fichier `.eslintrc.json` de la façon suivante :

- Projets Node.JS :

    ```json
    {
        "extends" : "throrinstudio"
    }
    ```

- Projets VueJS :

    ```json
    {
        "extends" : "throrinstudio/vue"
    }
    ```

**Remarque** : Pour chacune de ces extensions, les règles sont identiques. Il s'agit juste des différents plugins supplémentaires qui sont ou non rajoutés.
Ne vous en faites pas, ce module les installe pour vous.

## Types

- **Primitives** : Quand vous accédez à un type primitif, vous modifiez directement la variable.

    + `string`
    + `number`
    + `boolean`
    + `null`
    + `undefined`

    ```javascript
    const foo = 1;
    let bar = foo;

    bar = 9;

    console.log(foo, bar); // => 1, 9
    ```

- **Complexe** : Quand vous accédez à un type complexe, vous travaillez directement sur la référence.

    + `object`
    + `array`
    + `function`

    ```javascript
    const foo = [1, 2];
    const bar = foo;

    bar[0] = 9;

    console.log(foo[0], bar[0]); // => 9, 9
    ```

## References

- Utilisez `const` pour toutes vos références. N'utilisez pas `var`. eslint: [`prefer-const`](http://eslint.org/docs/rules/prefer-const.html), [`no-const-assign`](http://eslint.org/docs/rules/no-const-assign.html)

    > Cela permet de ne pas réassigner vos références par mégarde et ainsi éviter des bugs tout en améliorant la compréhension de votre code.

    ```javascript
    // bad
    var a = 1;
    var b = 2;

    // good
    const a = 1;
    const b = 2;
    ```

- Si vous comptez réassigner une référence, utilisez `let` à la place de `var`. eslint: [`no-var`](http://eslint.org/docs/rules/no-var.html)

    > `let` est "block-scoped" alors que `var` est "function-scopped"

    ```javascript
    // bad
    var count = 1;
    if (true) {
        count += 1;
    }

    // good, use the let.
    let count = 1;
    if (true) {
        count += 1;
    }
    ```

- **Important** : `let` et `const` sont "block-scopped" :

    ```javascript
    // const and let only exist in the blocks they are defined in.
    {
        let a     = 1;
        const b   = 1;
    }
    console.log(a); // ReferenceError
    console.log(b); // ReferenceError
    ```

## Objects

- Utilisez la syntaxe littérale pour la créatopn des objets. eslint: [`no-new-object`](http://eslint.org/docs/rules/no-new-object.html)

    ```javascript
    // bad
    const item = new Object();

    // good
    const item = {};
    ```

- Utilisez les "computed property names" quand vous créez un objet avec des propriétés dynamiques.

    > Ceci permet de définir votre objet en une seule fois

    ```javascript
    function getKey(k) {
        return `a key named ${k}`;
    }

    // bad
    const obj = {
        id    : 5,
        name  : 'San Francisco',
    };
    obj[getKey('enabled')] = true;

    // good
    const obj = {
        id                    : 5,
        name                  : 'San Francisco',
        [getKey('enabled')]   : true,
    };
    ```

- Utilisez les méthodes d'objet raccourcies. eslint: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand.html)

    ```javascript
    // bad
    const atom = {
        value: 1,
        addValue: function (value) {
            return atom.value + value;
        },
    };

    // good
    const atom = {
        value: 1,
        addValue(value) {
            return atom.value + value;
        },
    };
    ```

- Utilisez les valeurs raccourcies. eslint: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand.html)

    > C'est plus court à écrire et suffit amplement à la compréhension du code.

    ```javascript
    const lukeSkywalker = 'Luke Skywalker';

    // bad
    const obj = {
        lukeSkywalker: lukeSkywalker,
    };

    // good
    const obj = {
        lukeSkywalker,
    };
    ```

- Groupes toutes vos propriétés raccourcies au début de votre objet :

    > Cela permet de savoir facilement quelles propriétés sont des propriétés raccourcies.

    ```javascript
    const anakinSkywalker = 'Anakin Skywalker';
    const lukeSkywalker = 'Luke Skywalker';

    // bad
    const obj = {
        episodeOne              : 1,
        twoJediWalkIntoACantina : 2,
        lukeSkywalker,
        episodeThree            : 3,
        mayTheFourth            : 4,
        anakinSkywalker,
    };

    // good
    const obj = {
        lukeSkywalker,
        anakinSkywalker,
        episodeOne              : 1,
        twoJediWalkIntoACantina : 2,
        episodeThree            : 3,
        mayTheFourth            : 4,
    };
    ```

- Utilisez uniquement les quotes sur les noms de fields si leur nom est invalide sans. eslint: [`quote-props`](http://eslint.org/docs/rules/quote-props.html)

    > En général, on considère ceci simplement plus facile à lire. Ça améliore le syntax highlighting, et c'est surtout plus optimisé par plusieurs moteurs JS.

    ```javascript
    // bad
    const bad = {
        'foo'       : 3,
        'bar'       : 4,
        'data-blah' : 5,
    };

    // good
    const good = {
        foo         : 3,
        bar         : 4,
        'data-blah' : 5,
    };
    ```

- Préférez l'opérateur spread au lieu de [`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) pour copier des objets. Utilisez l'opérateur rest pour récupérer un nouvel objet en omettant certaines propriétés.

    ```javascript
    // very bad
    const original = { a: 1, b: 2 };
    const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
    delete copy.a; // so does this

    // bad
    const original = { a: 1, b: 2 };
    const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

    // good
    const original = { a: 1, b: 2 };
    const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

    const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
    ```

## Arrays

- Utilisez la syntaxe littérale pour la créatopn des arrays. eslint: [`no-array-constructor`](http://eslint.org/docs/rules/no-array-constructor.html)

    ```javascript
    // bad
    const items = new Array();

    // good
    const items = [];
    ```

- Utilisez [Array#push](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push) plutôt que d'ajouter directement une valeur à votre tableau.

    ```javascript
    const someStack = [];

    // bad
    someStack[someStack.length] = 'abracadabra';

    // good
    someStack.push('abracadabra');
    ```

- Utilisez le spread operator `...` pour copier des tableaux.

    ```javascript
    // bad
    const len = items.length;
    const itemsCopy = [];
    let i;

    for (i = 0; i < len; i += 1) {
        itemsCopy[i] = items[i];
    }

    // good
    const itemsCopy = [...items];
    ```

- Pour convertir un array-like objet en array, utilisez [Array.from](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

    ```javascript
    const foo = document.querySelectorAll('.foo');
    const nodes = Array.from(foo);
    ```

- Utilisez un return statement dans les callbacks des méthodes d'array. Il est possible de ne pas le mettre si le contenu de la fonction peut se faire en un seul traitement. eslint: [`array-callback-return`](http://eslint.org/docs/rules/array-callback-return)

    ```javascript
    // good
    [1, 2, 3].map((x) => {
        const y = x + 1;
        return x * y;
    });

    // good
    [1, 2, 3].map(x => x + 1);

    // bad
    const flat = {};
    [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
        const flatten = memo.concat(item);
        flat[index] = flatten;
    });

    // good
    const flat = {};
    [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
        const flatten = memo.concat(item);
        flat[index] = flatten;
        return flatten;
    });

    // bad
    inbox.filter((msg) => {
        const { subject, author } = msg;
        if (subject === 'Mockingbird') {
            return author === 'Harper Lee';
        } else {
            return false;
        }
    });

    // good
    inbox.filter((msg) => {
        const { subject, author } = msg;
        if (subject === 'Mockingbird') {
            return author === 'Harper Lee';
        }

        return false;
    });
    ```

## Destructuring

- Utilisez les objects destructuring si vous voulez accéder et utiliser plusieures propriétés d'un objet.

    > Le destructuring vous permet de ne pas créer des références pour ces propriétés.

    ```javascript
    // bad
    function getFullName(user) {
        const firstName = user.firstName;
        const lastName = user.lastName;

        return `${firstName} ${lastName}`;
    }

    // good
    function getFullName(user) {
        const { firstName, lastName } = user;
        return `${firstName} ${lastName}`;
    }

    // best
    function getFullName({ firstName, lastName }) {
        return `${firstName} ${lastName}`;
    }
    ```

- Utilisez les array destructuring

    ```javascript
    const arr = [1, 2, 3, 4];

    // bad
    const first = arr[0];
    const second = arr[1];

    // good
    const [first, second] = arr;
    ```

- Utilisez l'object destructuring pour retourner plusieures valeurs, pas l'array destructuring.

    > Vous pouvez ajouter de nouvelles propriétés ou changer l'ordre des éléments sans casser les différents appels.

    ```javascript
    // bad
    function processInput(input) {
        // then a miracle occurs
        return [left, right, top, bottom];
    }

    // the caller needs to think about the order of return data
    const [left, __, top] = processInput(input);

    // good
    function processInput(input) {
        // then a miracle occurs
        return { left, right, top, bottom };
    }

    // the caller selects only the data they need
    const { left, top } = processInput(input);
    ```

## Strings

- Utilisez les simples quotes `''` pour les strings.  eslint: [`quotes`](http://eslint.org/docs/rules/quotes.html)

    ```javascript
    // bad
    const name = "Capt. Janeway";

    // bad - template literals should contain interpolation or newlines
    const name = `Capt. Janeway`;

    // good
    const name = 'Capt. Janeway';
    ```

- Les Strings qui font que la ligne dépasse les 100 caractères ne dois plus être écrite sur plusieurs lignes utilisant les concaténations.

    > Les strings cassés en plusieurs parties compliquent les recherches et le travail avec.

    ```javascript
    // bad
    const errorMessage = 'This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // bad
    const errorMessage = 'This is a super long error that was thrown because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.';

    // good
    const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
    ```

- Lors de la création de strings utilisant des variables, utilisez les templates de Strings 9ES6) au lieu de la concaténation. eslint: [`prefer-template`](http://eslint.org/docs/rules/prefer-template.html) [`template-curly-spacing`](http://eslint.org/docs/rules/template-curly-spacing)

    > Les templates vous permettent d'avoir des strings lisibles facilement, une syntaxe propre avec de vrais sauts de ligne quand vous en voulez ainsi que la feature d'interpolations de variables.

    ```javascript
    // bad
    function sayHi(name) {
        return 'How are you, ' + name + '?';
    }

    // bad
    function sayHi(name) {
        return ['How are you, ', name, '?'].join();
    }

    // bad
    function sayHi(name) {
        return `How are you, ${ name }?`;
    }

    // good
    function sayHi(name) {
        return `How are you, ${name}?`;
    }
    ```

- Ne jamais utiliser la commande `eval()`. eslint [no-eval](http://eslint.org/docs/rules/no-eval)

- Ne pas nécessairement échapper des caractères dans les Strings. eslint: [`no-useless-escape`](http://eslint.org/docs/rules/no-useless-escape)

    > Les Backslashes compliquent la lecture. Ils ne doivent uniquement être présents par nécessité.

    ```javascript
    // bad
    const foo = '\'this\' \i\s \"quoted\"';

    // good
    const foo = '\'this\' is "quoted"';
    const foo = `my name is '${name}'`;
    ```

## Functions

- Utilisez les expressions de fonctions au lieux des déclarations de fonction. eslint: [`func-style`](http://eslint.org/docs/rules/func-style)

    > Les déclarations de fonctions sont hissées (déclarées en premier, avant n'importe quelle variable, ...). Il est donc facile - trop facile - de référencer cette fonction avant de la définir dans le fichier. Ceci complique fortement la lecture et la maintenabilité du code. N'oubliez surtout pas de nommer vos fonctions. Des fonctions anonymes compliquent le debug avec le résultat d'une callstack d'erreur. Si votre fonction devient trop compliquée et trop "grosse", vous devez peut-être la sortir de votre fichier actuel pour en faire un module à part entière.

    ```javascript
    // bad
    function foo() {
        // ...
    }

    // bad
    const foo = function () {
        // ...
    };

    // good
    const foo = function bar() {
        // ...
    };
    ```

- Wrappez les fonctions appelées immédiatement entre parenthèses. eslint: [`wrap-iife`](http://eslint.org/docs/rules/wrap-iife.html)

    > Une expression de fonction immédiatement appelée est une unité unique - l'enveloppant à la fois elle et ses parenthèses d'invocation, entre parenthèses, l'exprime clairement. Notez que dans un monde avec des modules partout, vous n'avez presque jamais besoin d'un IIFE.

    ```javascript
    // immediately-invoked function expression (IIFE)
    (function () {
      console.log('Welcome to the Internet. Please follow me.');
    }());
    ```

- Ne jamais déclarer une fonction dans un block non fonctionnel (if, while, ...). Assignez votre fonction à une variable à la place. eslint: [`no-loop-func`](http://eslint.org/docs/rules/no-loop-func.html)

- **Note** : ECMA-262 définit un "block" comme une liste de différents statements. Une déclaration de fonction n'est en aucun cas un statement. [Read ECMA-262's note on this issue](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97).

    ```javascript
    // bad
    if (currentUser) {
        function test() {
            console.log('Nope.');
        }
    }

    // good
    let test;
    if (currentUser) {
        test = () => {
            console.log('Yup.');
        };
    }
    ```

- Ne jamais appeler un paramètre de fonctions `arguments`. Ceci peut ammener des confusions ou des problèmes avec l'objet `arguments` disponible dans le scope de chaque fonction.

    ```javascript
    // bad
    function foo(name, options, arguments) {
        // ...
    }

    // good
    function foo(name, options, args) {
        // ...
    }
    ```

- Au lieu d'utiliser l'objet `arguments`, il est mieux et plus simple de passer par l'opérateur `...`. eslint: [`prefer-rest-params`](http://eslint.org/docs/rules/prefer-rest-params)

    > `...` est beaucoup plus explicite pour les arguments que vous pouvez rajouter dans une fonction. De plus les arguments récupérés avec forment un véritable Array.

    ```javascript
    // bad
    function concatenateAll() {
        const args = Array.prototype.slice.call(arguments);
        return args.join('');
    }

    // good
    function concatenateAll(...args) {
        return args.join('');
    }
    ```

- Utilisez les paramètres par défaut plutôt que de faire du mutating.

    ```javascript
    // really bad
    function handleThings(opts) {
        // No! We shouldn't mutate function arguments.
        // Double bad: if opts is falsy it'll be set to an object which may
        // be what you want but it can introduce subtle bugs.
        opts = opts || {};
        // ...
    }

    // still bad
    function handleThings(opts) {
        if (opts === void 0) {
            opts = {};
        }
        // ...
    }

    // good
    function handleThings(opts = {}) {
        // ...
    }
    ```

- Évitez les effets de bord avec les paramètres par défaut

    ```javascript
    var b = 1;
    // bad
    function count(a = b++) {
        console.log(a);
    }
    count();  // 1
    count();  // 2
    count(3); // 3
    count();  // 3
    ```

- Toujours mettre les paramêtres par défaut en dernier

    ```javascript
    // bad
    function handleThings(opts = {}, name) {
        // ...
    }

    // good
    function handleThings(name, opts = {}) {
        // ...
    }
    ```

- Ne jamais utiliser le constructeur `Function` pour créer une nouvelle fonction. eslint: [`no-new-func`](http://eslint.org/docs/rules/no-new-func)

    > Créer une fonction par cette méthode évalue la String de ma même manière que le `eval()`.

    ```javascript
    // bad
    var add = new Function('a', 'b', 'return a + b');

    // still bad
    var subtract = Function('a', 'b', 'return a - b');
    ```

- Espacement dans les signatures de fonction. eslint: [`space-before-function-paren`](http://eslint.org/docs/rules/space-before-function-paren) [`space-before-blocks`](http://eslint.org/docs/rules/space-before-blocks)

    > La cohérence est bonne, et vous ne devriez pas avoir à ajouter ou supprimer un espace lors de l'ajout ou la suppression d'un nom.

    ```javascript
    // bad
    const f = function(){};
    const g = function (){};
    const h = function() {};

    // good
    const x = function () {};
    const y = function a() {};
    ```

- Ne jamais surcharger des paramètres. **Remarque** : Cette limitation est désactivée pour les fonctions `map`, `filter`, et autres Promesses.

    > Réassigner des paramètres peut causer des effets de bord avec la stack appelante.

    ```javascript
    // bad
    function f1(obj) {
        obj.key = 1;
    }

    // good
    function f2(obj) {
        const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
    }
    ```

- Ne jamais réassigner des paramètres.

    > Réassigner des paramètres peut causer des effets de bord surtout si vous accédez à l'objet `arguments`. Cela peut aussi causer des soucis d'optimisation. Surtout en V8.

    ```javascript
    // bad
    function f1(a) {
        a = 1;
        // ...
    }

    function f2(a) {
        if (!a) { a = 1; }
        // ...
    }

    // good
    function f3(a) {
        const b = a || 1;
        // ...
    }

    function f4(a = 1) {
        // ...
    }
    ```

- Préférez l'utilisation du spread operator `...` pour appeler des fonctions avec un nombre de paramètres variables. eslint: [`prefer-spread`](http://eslint.org/docs/rules/prefer-spread)

    > C'est plus propre, vous n'avez pas à spécifier le contexte et vous n'avez pas à coupler un `new` avec `apply`.

    ```javascript
    // bad
    const x = [1, 2, 3, 4, 5];
    console.log.apply(console, x);

    // good
    const x = [1, 2, 3, 4, 5];
    console.log(...x);

    // bad
    new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

    // good
    new Date(...[2016, 8, 5]);
    ```

- Les fonctions avec des signatures, ou invications, sur plusieurs lignes doivent êtres indentées comme toute autre liste dans ce guide : Avec chaque item sur une nouvelle ligne et une `,` en fin de ligne, y compris sur la dernière.

    ```javascript
    // bad
    function foo(bar,
                 baz,
                 quux) {
        // ...
    }

    // good
    function foo(
        bar,
        baz,
        quux,
    ) {
        // ...
    }

    // bad
    console.log(foo,
        bar,
        baz);

    // good
    console.log(
        foo,
        bar,
        baz,
    );
    ```

## Arrow Functions

- Quand vous devez passer par une expression de fonctions (quand vous passez une fonction anonyme), utilisez la notation de fonctions fléchées. eslint: [`prefer-arrow-callback`](http://eslint.org/docs/rules/prefer-arrow-callback.html), [`arrow-spacing`](http://eslint.org/docs/rules/arrow-spacing.html)

    > Ça créer une version de la fonction utilisée dans le contexte `this`, qui est la plupart du temps ce que vous voulez (évite un `bind(this)`)

    ```javascript
    // bad
    [1, 2, 3].map(function (x) {
        const y = x + 1;
        return x * y;
    });

    // good
    [1, 2, 3].map((x) => {
        const y = x + 1;
        return x * y;
    });
    ```

- Si le contenu de la fonction fléchée se résume à une seule expression, oubliez les accolades et utilisez le `return` implicite. Sinon, laissez les et utilisez un `return` statement. eslint: [`arrow-parens`](http://eslint.org/docs/rules/arrow-parens.html), [`arrow-body-style`](http://eslint.org/docs/rules/arrow-body-style.html)

    > Sucre syntaxique. Il y a une meilleure lecture quand plusieurs fonctions sont enchaînées ensemble.

    ```javascript
    // bad
    [1, 2, 3].map(number => {
        const nextNumber = number + 1;
        `A string containing the ${nextNumber}.`;
    });

    // good
    [1, 2, 3].map(number => `A string containing the ${number}.`);

    // good
    [1, 2, 3].map((number) => {
        const nextNumber = number + 1;
        return `A string containing the ${nextNumber}.`;
    });

    // good
    [1, 2, 3].map((number, index) => ({
        [index]: number,
    }));
    ```

- Dans le cas où l'expression s'étend sur plusieurs lignes, l'envelopper entre parenthèses pour une meilleure lisibilité.

    > Elles indiquent clairement où commence et se termine la fonction.

    ```javascript
    // bad
    ['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
        httpMagicObjectWithAVeryLongName,
        httpMethod,
      )
    );

    // good
    ['get', 'post', 'put'].map(httpMethod => (
      Object.prototype.hasOwnProperty.call(
        httpMagicObjectWithAVeryLongName,
        httpMethod,
      )
    ));
    ```

- Si votre fonction prend un seul argument et n'utilise pas d'accolades, omettez les parenthèses. Sinon, incluez toujours des parenthèses autour des arguments pour plus de clarté et de cohérence. Remarque: il est également acceptable de toujours utiliser des parenthèses. Dans ce cas, utilisez l'option  ["always" option](http://eslint.org/docs/rules/arrow-parens#always) pour eslint. eslint: [`arrow-parens`](http://eslint.org/docs/rules/arrow-parens.html)

    > Pourquoi ? Moins d'encombrement visuel.

    ```javascript
    // bad
    [1, 2, 3].map((x) => x * x);

    // good
    [1, 2, 3].map(x => x * x);

    // good
    [1, 2, 3].map(number => (
        `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
    ));

    // bad
    [1, 2, 3].map(x => {
        const y = x + 1;
        return x * y;
    });

    // good
    [1, 2, 3].map((x) => {
        const y = x + 1;
        return x * y;
    });
    ```

- Évitez de confondre la syntaxe de la fonction fléchée (`=>`) avec les opérateurs de comparaison (`<=`, `>=`). eslint: [`no-confusing-arrow`](http://eslint.org/docs/rules/no-confusing-arrow)

    ```javascript
    // bad
    const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;

    // bad
    const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize;

    // good
    const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);

    // good
    const itemHeight = (item) => {
        const { height, largeSize, smallSize } = item;
        return height > 256 ? largeSize : smallSize;
    };
    ```

## Classes et Constructeurs

- Toujours utiliser `class`. Évitez de manipuler `prototype` directement.

    > La syntaxe `class` est plus concise et plus facile à raisonner.

    ```javascript
    // bad
    function Queue(contents = []) {
        this.queue = [...contents];
    }
    Queue.prototype.pop = function () {
        const value = this.queue[0];
        this.queue.splice(0, 1);
        return value;
    };


    // good
    class Queue {
        constructor(contents = []) {
            this.queue = [...contents];
        }
        pop() {
            const value = this.queue[0];
            this.queue.splice(0, 1);
            return value;
        }
    }
    ```

- Utilisez `extends` pour les héritages

    > Il s'agit d'un moyen intégré d'hériter des fonctionnalités de prototype sans casser `instanceof`.

    ```javascript
    // bad
    const inherits = require('inherits');
    function PeekableQueue(contents) {
        Queue.apply(this, contents);
    }
    inherits(PeekableQueue, Queue);
    PeekableQueue.prototype.peek = function () {
        return this.queue[0];
    };

    // good
    class PeekableQueue extends Queue {
        peek() {
            return this.queue[0];
        }
    }
    ```

- Les méthodes peuvent retourner `this` pour faciliter le chaînage des méthodes.

    ```javascript
    // bad
    Jedi.prototype.jump = function () {
        this.jumping = true;
        return true;
    };

    Jedi.prototype.setHeight = function (height) {
        this.height = height;
    };

    const luke = new Jedi();
    luke.jump(); // => true
    luke.setHeight(20); // => undefined

    // good
    class Jedi {
        jump() {
            this.jumping = true;
            return this;
        }

        setHeight(height) {
            this.height = height;
            return this;
        }
    }

    const luke = new Jedi();

    luke.jump().setHeight(20);
    ```

- Il est normal d'écrire une méthode personnalisée toString (), il suffit de s'assurer de son bon fonctionnement et qu'elle ne provoque aucun effet secondaire.

    ```javascript
    class Jedi {
        constructor(options = {}) {
            this.name = options.name || 'no name';
        }

        getName() {
            return this.name;
        }

        toString() {
            return `Jedi - ${this.getName()}`;
        }
    }
    ```

- Les classes ont un constructeur par défaut s'il n'est pas spécifié. Une fonction de constructeur vide ou une déléguée à une classe parente est inutile. eslint: [`no-useless-constructor`](http://eslint.org/docs/rules/no-useless-constructor)

    ```javascript
    // bad
    class Jedi {
      constructor() {}

      getName() {
        return this.name;
      }
    }

    // bad
    class Rey extends Jedi {
      constructor(...args) {
        super(...args);
      }
    }

    // good
    class Rey extends Jedi {
      constructor(...args) {
        super(...args);
        this.name = 'Rey';
      }
    }
    ```

- Évitez les doublons. eslint: [`no-dupe-class-members`](http://eslint.org/docs/rules/no-dupe-class-members)

    > Lors d'une déclaration de membres de classes en double, la classe préfèrera la dernière saisie.

    ```javascript
    // bad
    class Foo {
        bar() { return 1; }
        bar() { return 2; }
    }

    // good
    class Foo {
        bar() { return 1; }
    }

    // good
    class Foo {
        bar() { return 2; }
    }
    ```

## Modules (uniquement pour projets Front pour le moment)

- Utilisez toujours des modules (`import` /` export`) sur un système de modules non standard. Vous pouvez toujours transpiler vers votre système de module préféré.

    > Les modules sont l'avenir, commençons à utiliser l'avenir maintenant. Et puis ce sont surtout les nouveaux standards ES6

    ```javascript
    // bad
    const AirbnbStyleGuide = require('./AirbnbStyleGuide');
    module.exports = AirbnbStyleGuide.es6;

    // ok
    import AirbnbStyleGuide from './AirbnbStyleGuide';
    export default AirbnbStyleGuide.es6;

    // best
    import { es6 } from './AirbnbStyleGuide';
    export default es6;
    ```

- N'utilisez pas les wildcards import

    > Cela garantit une exportation par défaut.

    ```javascript
    // bad
    import * as AirbnbStyleGuide from './AirbnbStyleGuide';

    // good
    import AirbnbStyleGuide from './AirbnbStyleGuide';
    ```

- Et n'exportez pas directement d'un import

    > Bien que le one-liner soit concis, le fait d'avoir un moyen clair d'importer et un moyen clair d'exporter rend les choses cohérentes.

    ```javascript
    // bad
    // filename es6.js
    export { es6 as default } from './AirbnbStyleGuide';

    // good
    // filename es6.js
    import { es6 } from './AirbnbStyleGuide';
    export default es6;
    ```

- Importez uniquement à partir d'un chemin/module en un seul endroit. eslint: [`no-duplicate-imports`](http://eslint.org/docs/rules/no-duplicate-imports)

    > Avoir plusieurs lignes qui importent à partir du même chemin peut rendre le code plus difficile à maintenir.

    ```javascript
    // bad
    import foo from 'foo';
    // … some other imports … //
    import { named1, named2 } from 'foo';

    // good
    import foo, { named1, named2 } from 'foo';

    // good
    import foo, {
        named1,
        named2,
    } from 'foo';
    ```

- N'exportez pas de mutable bindings. eslint: [`import/no-mutable-exports`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md)

    ```javascript
    // bad
    let foo = 3;
    export { foo };

    // good
    const foo = 3;
    export { foo };
    ```

- Dans un module avec un seul export, préférez utiliser le default export plutôt qu'un export nommé. eslint: [`import/prefer-default-export`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md)

    ```javascript
    // bad
    export function foo() {}

    // good
    export default function foo() {}
    ```

- Mettez tous vos import avant n'importe quel autre statement. eslint: [`import/first`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)

    > Puisque les `import` sont hissés, les garder en début de fichier empêche un comportement bizarre.

    ```javascript
    // bad
    import foo from 'foo';
    foo.init();

    import bar from 'bar';

    // good
    import foo from 'foo';
    import bar from 'bar';

    foo.init();
    ```

- Interdire la syntaxe de Webpack dans les `import`. eslint: [`import/no-webpack-loader-syntax`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md)

    > Si vous utilisez la syntaxe de Webpack dans l'import, vous couplez fortement votre code à ce builder. Il est lutôt conseillé de mettre en place les différents loaders dans `webpack.config.js`.

    ```javascript
    // bad
    import fooSass from 'css!sass!foo.scss';
    import barCss from 'style!css!bar.css';

    // good
    import fooSass from 'foo.scss';
    import barCss from 'bar.css';
    ```

## Iterators et Generators

- N'utilisez pas d'itérateurs. Préférez les fonctions d'ordre supérieur de JavaScript plutôt que les boucles comme `for-in` ou` for-of`. eslint: [`no-iterator`](http://eslint.org/docs/rules/no-iterator.html) [`no-restricted-syntax`](http://eslint.org/docs/rules/no-restricted-syntax)

    > Fait respecter nos règles sur les immutables. Traiter avec des fonctions pures qui retournent des valeurs est plus facile à comprendre et permet d'éviter de possibles effets de bord.

    > Utiliser `map()` / `every()` / `filter()` / `find()` / `findIndex ()` / `reduce()` / `some()` / ... pour itérer sur des tableaux , Et `Object.keys()` / `Object.values()` / `Object.entries()` pour produire des tableaux afin que vous puissiez itérer sur des objets.

    ```javascript
    const numbers = [1, 2, 3, 4, 5];

    // bad
    let sum = 0;
    for (let num of numbers) {
        sum += num;
    }
    sum === 15;

    // good
    let sum = 0;
    numbers.forEach(num => sum += num);
    sum === 15;

    // best (use the functional force)
    const sum = numbers.reduce((total, num) => total + num, 0);
    sum === 15;

    // bad
    const increasedByOne = [];
    for (let i = 0; i < numbers.length; i++) {
        increasedByOne.push(numbers[i] + 1);
    }

    // good
    const increasedByOne = [];
    numbers.forEach(num => increasedByOne.push(num + 1));

    // best (keeping it functional)
    const increasedByOne = numbers.map(num => num + 1);
    ```

- N'utilisez pas encore les générateurs **Front uniquement**.

    > Ils ne peuvent pas être convertis en ES5.

- Si vous devez utiliser des générateurs, ou si vous négligez nos conseils, assurez-vous que la signature de fonction est espacée correctement. eslint: [`generator-star-spacing`](http://eslint.org/docs/rules/generator-star-spacing)

    > `function` et` * `font partie du même mot-clé conceptuel -`*`n'est pas un modificateur pour `function`, `function*` est une construction unique, différente de `function`.

    ```javascript
    // bad
    function * foo() {
        // ...
    }

    // bad
    const bar = function * () {
        // ...
    };

    // bad
    const baz = function *() {
        // ...
    };

    // bad
    const quux = function*() {
        // ...
    };

    // bad
    function*foo() {
        // ...
    }

    // bad
    function *foo() {
        // ...
    }

    // very bad
    function
    *
    foo() {
        // ...
    }

    // very bad
    const wat = function
    *
    () {
        // ...
    };

    // good
    function* foo() {
        // ...
    }

    // good
    const foo = function* () {
        // ...
    };
    ```

## Properties

- Utiliser la notation par points pour accéder aux propriétés. eslint: [`dot-notation`](http://eslint.org/docs/rules/dot-notation.html)

    ```javascript
    const luke = {
        jedi : true,
        age  : 28,
    };

    // bad
    const isJedi = luke['jedi'];

    // good
    const isJedi = luke.jedi;
    ```

- Utilisez la notation entre crochets `[]` pour accéder aux propriétés avec une variable.

    ```javascript
    const luke = {
        jedi : true,
        age  : 28,
    };

    function getProp(prop) {
        return luke[prop];
    }

    const isJedi = getProp('jedi');
    ```

## variables

- Toujours utiliser `const` pour déclarer les variables. Si vous ne le faites pas, vous obtiendrez des variables globales. eslint: [`no-undef`](http://eslint.org/docs/rules/no-undef) [`prefer-const`](http://eslint.org/docs/rules/prefer-const)

    ```javascript
    // bad
    superPower = new SuperPower();

    // good
    const superPower = new SuperPower();
    ```

- Utilisez une déclaration `const` par variable. eslint: [`one-var`](http://eslint.org/docs/rules/one-var.html)

    > Il est plus facile d'ajouter de nouvelles déclarations de variables de cette façon et vous ne devez jamais vous préoccuper d'échanger un `;` pour un `,` ou d'introduire des différences de ponctuation. Vous pouvez également parcourir chaque déclaration avec le débogueur, au lieu de sauter à travers tous les à la fois.

    ```javascript
    // bad
    const items         = getItems(),
          goSportsTeam  = true,
          dragonball    = 'z';

    // bad
    // (compare to above, and try to spot the mistake)
    const items         = getItems(),
          goSportsTeam  = true;
          dragonball    = 'z';

    // good
    const items         = getItems();
    const goSportsTeam  = true;
    const dragonball    = 'z';
    ```

- Groupez tous vos `const` et groupes tous vos `let`.

    > C'est utile lorsque plus tard vous devrez peut-être affecter une variable en fonction de l'une des variables assignées précédemment.

    ```javascript
    // bad
    let i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;

    // bad
    let i;
    const items = getItems();
    let dragonball;
    const goSportsTeam = true;
    let len;

    // good
    const goSportsTeam = true;
    const items        = getItems();
    let dragonball;
    let i;
    let length;
    ```

- Attribuez des variables là où vous en avez besoin, mais placez-les dans un endroit raisonnable.

    - `let` et `const` sont des variables de block. Vous devrez les définir en fonction du block pouvant les utiliser.

    ```javascript
    // bad - unnecessary function call
    function checkName(hasName) {
        const name = getName();

        if (hasName === 'test') {
            return false;
        }

        if (name === 'test') {
            this.setName('');
            return false;
        }

        return name;
    }

    // good
    function checkName(hasName) {
        if (hasName === 'test') {
            return false;
        }

        const name = getName();

        if (name === 'test') {
            this.setName('');
            return false;
        }

        return name;
    }
    ```

- Ne chaînez pas les assignements de variable.

    > Chaîner des assignements de variables créer des variables globales.

    ```javascript
    // bad
    (function example() {
        // JavaScript interprets this as
        // let a = ( b = ( c = 1 ) );
        // The let keyword only applies to variable a; variables b and c become
        // global variables.
        let a = b = c = 1;
    }());

    console.log(a); // undefined
    console.log(b); // 1
    console.log(c); // 1

    // good
    (function example() {
        let a = 1;
        let b = a;
        let c = a;
    }());

    console.log(a); // undefined
    console.log(b); // undefined
    console.log(c); // undefined

    // the same applies for `const`
    ```

## Hoisting

- la déclaration des `var` se trouve hissée au plus haut de son scope. Leur assignement non. les déclarations de `const` et `let` utilisent un nouveau concept appelé [Temporal Dead Zones (TDZ)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let). Il est important de savoir pourquoi [typeof n'est plus sûr](http://es-discourse.com/t/why-typeof-is-no-longer-safe/15).

    ```javascript
    // we know this wouldn't work (assuming there
    // is no notDefined global variable)
    function example() {
        console.log(notDefined); // => throws a ReferenceError
    }

    // creating a variable declaration after you
    // reference the variable will work due to
    // variable hoisting. Note: the assignment
    // value of `true` is not hoisted.
    function example() {
        console.log(declaredButNotAssigned); // => undefined
        var declaredButNotAssigned = true;
    }

    // the interpreter is hoisting the variable
    // declaration to the top of the scope,
    // which means our example could be rewritten as:
    function example() {
        let declaredButNotAssigned;
        console.log(declaredButNotAssigned); // => undefined
        declaredButNotAssigned = true;
    }

    // using const and let
    function example() {
        console.log(declaredButNotAssigned); // => throws a ReferenceError
        console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
        const declaredButNotAssigned = true;
    }
    ```

- Les expressions de fonction anonymes hissent leur nom de variable, mais pas l'assignement de fonction.

    ```javascript
    function example() {
        console.log(anonymous); // => undefined

        anonymous(); // => TypeError anonymous is not a function

        var anonymous = function () {
            console.log('anonymous function expression');
        };
    }
    ```

- Les expressions de fonction nommées hisser le nom de la variable, pas le nom de la fonction ou le corps de la fonction.

    ```javascript
    function example() {
        console.log(named); // => undefined

        named(); // => TypeError named is not a function

        superPower(); // => ReferenceError superPower is not defined

        var named = function superPower() {
            console.log('Flying');
        };
    }

    // the same is true when the function name
    // is the same as the variable name.
    function example() {
        console.log(named); // => undefined

        named(); // => TypeError named is not a function

        var named = function named() {
            console.log('named');
        };
    }
    ```

- Les déclarations de fonctions hissent leur nom et le corps de la fonction.

    ```javascript
    function example() {
        superPower(); // => Flying

        function superPower() {
            console.log('Flying');
        }
    }
    ```

- Pour plus d'informations, vous pouvez vous référer à [JavaScript Scoping & Hoisting](http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting/) par [Ben Cherry](http://www.adequatelygood.com/).

## Comparison Operators & Equality

- Utilisez `===` et `!==` plutôt que `==` et `!=`. eslint: [`eqeqeq`](http://eslint.org/docs/rules/eqeqeq.html)

- Les instructions conditionnelles telles que l'instruction `if` évaluent l'expression en utilisant la coercition avec la méthode abstraite` ToBoolean` et suivent toujours ces règles simples:
    + **Objects** évalué en **true**
    + **Undefined** évalué en **false**
    + **Null** évalué en **false**
    + **Booleans** évalué en **valeur du boolean**
    + **Numbers** évalué en **false** si **+0, -0, or NaN**, sinon **true**
    + **Strings** évalué en **false** si string vide `''`, sinon **true**

    ```javascript
    if ([0] && []) {
        // true
        // an array (even an empty one) is an object, objects will evaluate to true
    }
    ```

- Utilisez des raccourcis pour les booléens, mais des comparaisons explicites pour les chaînes et les nombres.

    ```javascript
    // bad
    if (isValid === true) {
        // ...
    }

    // good
    if (isValid) {
        // ...
    }

    // bad
    if (name) {
        // ...
    }

    // good
    if (name !== '') {
        // ...
    }

    // bad
    if (collection.length) {
        // ...
    }

    // good
    if (collection.length > 0) {
        // ...
    }
    ```

- Pour plus d'informations, regardez [Truth Equality and JavaScript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108) par Angus Croll.

- Utilisez des accolades pour créer des blocs dans les clauses `case` et` default` qui contiennent des déclarations lexicales (par exemple, `let`,` const`, `function` et` class`).  eslint: [`no-case-declarations`](http://eslint.org/docs/rules/no-case-declarations.html).

    > Les déclarations lexicales sont visibles dans tout le bloc `switch` mais ne sont initialisées que lorsqu'elles sont affectées, ce qui ne se produit que lorsque son` case` est atteint. Cela provoque des problèmes lorsque plusieurs clauses `case` tentent de définir la même chose.

    ```javascript
    // bad
    switch (foo) {
        case 1:
            let x = 1;
            break;
            case 2:
            const y = 2;
            break;
            case 3:
                function f() {
                    // ...
                }
                break;
            default:
                class C {}
    }

    // good
    switch (foo) {
        case 1: {
            let x = 1;
            break;
        }
        case 2: {
            const y = 2;
            break;
        }
        case 3: {
            function f() {
                // ...
            }
            break;
        }
        case 4:
            bar();
            break;
        default: {
            class C {}
        }
    }
    ```

- Les ternaires ne doivent pas être imbriqués et sont généralement des expressions à une seule ligne. eslint: [`no-nested-ternary`](http://eslint.org/docs/rules/no-nested-ternary.html).

    ```javascript
    // bad
    const foo = maybe1 > maybe2
        ? "bar"
        : value1 > value2 ? "baz" : null;

    // better
    const maybeNull = value1 > value2 ? 'baz' : null;

    const foo = maybe1 > maybe2
        ? 'bar'
        : maybeNull;

    // best
    const maybeNull = value1 > value2 ? 'baz' : null;

    const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
    ```

- Évitez les déclarations ternaires inutiles. eslint: [`no-unneeded-ternary`](http://eslint.org/docs/rules/no-unneeded-ternary.html).

    ```javascript
    // bad
    const foo = a ? a : b;
    const bar = c ? true : false;
    const baz = c ? false : true;

    // good
    const foo = a || b;
    const bar = !!c;
    const baz = !c;
    ```

## Blocks

- Utilisez les accolades pour tous les blocks multilignes.

    ```javascript
    // bad
    if (test)
        return false;

    // good
    if (test) return false;

    // good
    if (test) {
        return false;
    }

    // bad
    function foo() { return false; }

    // good
    function bar() {
        return false;
    }
    ```

- Si vous utilisez des blocs multi-lignes avec `if` et` else`, placez `else` sur la même ligne que l'attache de fermeture de votre bloc` if`. eslint: [`brace-style`](http://eslint.org/docs/rules/brace-style.html)

    ```javascript
    // bad
    if (test) {
        thing1();
        thing2();
    }
    else {
        thing3();
    }

    // good
    if (test) {
        thing1();
        thing2();
    } else {
        thing3();
    }
    ```

## Commentaires

- Utilisez `/** ... */` pour les commentaires multilignes.

    ```javascript
    // bad
    // make() returns a new element
    // based on the passed in tag name
    //
    // @param {String} tag
    // @return {Element} element
    function make(tag) {

        // ...

        return element;
    }

    // good
    /**
    * make() returns a new element
    * based on the passed-in tag name
    */
    function make(tag) {

        // ...

        return element;
    }
    ```

- Utilisez `//` pour les commentaires d'une seule ligne. Placez les commentaires d'une ligne sur une nouvelle ligne au-dessus du sujet du commentaire. Mettez une ligne vide avant le commentaire sur la première ligne d'un bloc.

    ```javascript
    // bad
    const active = true;  // is current tab

    // good
    // is current tab
    const active = true;

    // bad
    function getType() {
        console.log('fetching type...');
        // set the default type to 'no type'
        const type = this.type || 'no type';

        return type;
    }

    // good
    function getType() {
        console.log('fetching type...');

        // set the default type to 'no type'
        const type = this.type || 'no type';

        return type;
    }

    // also good
    function getType() {
        // set the default type to 'no type'
        const type = this.type || 'no type';

        return type;
    }
    ```

- Commencez tous les commentaires avec un espace pour faciliter la lecture. eslint: [`spaced-comment`](http://eslint.org/docs/rules/spaced-comment)

    ```javascript
    // bad
    //is current tab
    const active = true;

    // good
    // is current tab
    const active = true;

    // bad
    /**
     *make() returns a new element
     *based on the passed-in tag name
     */
    function make(tag) {

        // ...

        return element;
    }

    // good
    /**
     * make() returns a new element
     * based on the passed-in tag name
     */
    function make(tag) {
        // ...

        return element;
    }
    ```

- Préfixer vos commentaires avec `FIXME` ou` TODO` peut aider d'autres développeurs à comprendre rapidement si vous signalez un problème qui doit être revu, ou si vous proposez une solution au problème qui doit être mis en œuvre. Ceux-ci sont différents des commentaires réguliers parce qu'ils sont susceptibles d'indiquer une action à effectuer. Les actions sont `FIXME: - besoin de comprendre cela` ou `TODO: - besoin d'implémenter`.

- Utilisez `// FIXME:` pour noter un problème

    ```javascript
    class Calculator extends Abacus {
        constructor() {
            super();

            // FIXME: shouldn't use a global here
            total = 0;
        }
    }
    ```

- Utilisez `// TODO:` pour indiquer une action à faire ou pour donner une solution à un problème.

    ```javascript
    class Calculator extends Abacus {
        constructor() {
            super();

            // TODO: total should be configurable by an options param
            this.total = 0;
        }
    }
    ```

## Whitespaces

- Utilisez l'indentation légère (caractère espace) composé de 4 espaces. eslint: [`indent`](http://eslint.org/docs/rules/indent.html)

    ```javascript
    // bad
    function foo() {
    ∙∙let name;
    }

    // bad
    function bar() {
    ∙let name;
    }

    // good
    function baz() {
    ∙∙∙∙let name;
    }
    ```

- Placez 1 espace avant l'accolade de tête. eslint: [`space-before-blocks`](http://eslint.org/docs/rules/space-before-blocks.html)

    ```javascript
    // bad
    function test(){
        console.log('test');
    }

    // good
    function test() {
        console.log('test');
    }

    // bad
    dog.set('attr',{
        age   : '1 year',
        breed : 'Bernese Mountain Dog',
    });

    // good
    dog.set('attr', {
        age   : '1 year',
        breed : 'Bernese Mountain Dog',
    });
    ```

- Placez 1 espace avant la parenthèse ouvrante dans les instructions de contrôle (`if`, `while`, etc.). Ne placez aucun espace entre la liste des arguments et le nom de la fonction dans les appels de fonction et les déclarations. eslint: [`keyword-spacing`](http://eslint.org/docs/rules/keyword-spacing.html)

    ```javascript
    // bad
    if(isJedi) {
        fight ();
    }

    // good
    if (isJedi) {
        fight();
    }

    // bad
    function fight () {
        console.log ('Swooosh!');
    }

    // good
    function fight() {
        console.log('Swooosh!');
    }
    ```

- Séparer les opérateurs avec des espaces. eslint: [`space-infix-ops`](http://eslint.org/docs/rules/space-infix-ops.html)

    ```javascript
    // bad
    const x=y+5;

    // good
    const x = y + 5;
    ```

- Terminez vos fichiers par une ligne vide. eslint: [`eol-last`](https://github.com/eslint/eslint/blob/master/docs/rules/eol-last.md)

    ```javascript
    // bad
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;
    ```

    ```javascript
    // bad
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;↵
    ↵
    ```

    ```javascript
    // good
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;↵
    ```

- Utilisez l'indentation lors de la création de longues chaînes de méthodes (plus de 2 chaînes de méthodes). Utilisez un point de tête, qui souligne que la ligne est un appel de méthode, pas une nouvelle instruction. eslint: [`newline-per-chained-call`](http://eslint.org/docs/rules/newline-per-chained-call) [`no-whitespace-before-property`](http://eslint.org/docs/rules/no-whitespace-before-property)

    ```javascript
    // bad
    $('#items').find('.selected').highlight().end().find('.open').updateCount();

    // bad
    $('#items').
        find('.selected').
            highlight().
            end().
        find('.open').
            updateCount();

    // good
    $('#items')
        .find('.selected')
            .highlight()
            .end()
        .find('.open')
            .updateCount();

    // bad
    const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
        .attr('width', (radius + margin) * 2).append('svg:g')
        .attr('transform', `translate(${radius + margin},${radius + margin})`)
        .call(tron.led);

    // good
    const leds = stage.selectAll('.led')
            .data(data)
        .enter().append('svg:svg')
            .classed('led', true)
            .attr('width', (radius + margin) * 2)
        .append('svg:g')
            .attr('transform', `translate(${radius + margin},${radius + margin})`)
            .call(tron.led);

    // good
    const leds = stage.selectAll('.led').data(data);
    ```

- Laissez une ligne blanche après un block et le statement qui suit.

    ```javascript
    // bad
    if (foo) {
        return bar;
    }
    return baz;

    // good
    if (foo) {
        return bar;
    }

    return baz;

    // bad
    const obj = {
        foo() {
        },
        bar() {
        },
    };
    return obj;

    // good
    const obj = {
        foo() {
        },
        bar() {
        },
    };

    return obj;

    // bad
    const arr = [
        function foo() {
        },
        function bar() {
        },
    ];
    return arr;

    // good
    const arr = [
        function foo() {
        },
        function bar() {
        },
    ];

    return arr;
    ```

- Ne commencez et/ou ne finissez pas vos blocks par une ligne vide. eslint: [`padded-blocks`](http://eslint.org/docs/rules/padded-blocks.html)

    ```javascript
    // bad
    function bar() {

        console.log(foo);

    }

    // also bad
    if (baz) {

        console.log(qux);
    } else {
        console.log(foo);

    }

    // good
    function bar() {
        console.log(foo);
    }

    // good
    if (baz) {
        console.log(qux);
    } else {
        console.log(foo);
    }
    ```

- Ne mettez pas d'espace dans les parenthèses. eslint: [`space-in-parens`](http://eslint.org/docs/rules/space-in-parens.html)

    ```javascript
    // bad
    function bar( foo ) {
        return foo;
    }

    // good
    function bar(foo) {
        return foo;
    }

    // bad
    if ( foo ) {
        console.log(foo);
    }

    // good
    if (foo) {
        console.log(foo);
    }
    ```

- Ne pas mettre d'espaces entre crochets. eslint: [`array-bracket-spacing`](http://eslint.org/docs/rules/array-bracket-spacing.html)

    ```javascript
    // bad
    const foo = [ 1, 2, 3 ];
    console.log(foo[ 0 ]);

    // good
    const foo = [1, 2, 3];
    console.log(foo[0]);
    ```

- Ajoutez des espaces dans des accolades. eslint: [`object-curly-spacing`](http://eslint.org/docs/rules/object-curly-spacing.html)

    ```javascript
    // bad
    const foo = {clark: 'kent'};

    // good
    const foo = { clark: 'kent' };
    ```

- Évitez d'avoir des lignes de code qui sont plus long que 125 caractères (y compris les espaces). Note: les chaînes longues sont exemptées de cette règle et ne doivent pas être rompues. eslint: [`max-len`](http://eslint.org/docs/rules/max-len.html)

    > Cela garantit la lisibilité et la maintenabilité.

    ```javascript
    // bad
    const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

    // bad
    $.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));

    // good
    const foo = jsonData
        && jsonData.foo
        && jsonData.foo.bar
        && jsonData.foo.bar.baz
        && jsonData.foo.bar.baz.quux
        && jsonData.foo.bar.baz.quux.xyzzy;

    // good
    $.ajax({
        method  : 'POST',
        url     : 'https://airbnb.com/',
        data    : { name: 'John' },
    })
        .done(() => console.log('Congratulations!'))
        .fail(() => console.log('You have failed this city.'));
    ```

- Pour les objets définits sur plusieurs lignes, aligner les clés/valeurs. eslint : [`key-spacing`](http://eslint.org/docs/rules/key-spacing)

    ```javascript
    // bad
    const obj = {
        firstname : "Joe",
        lastname : "Black",
        age : 12
    };

    // good
    const obj = {
        firstname : "Joe",
        lastname  : "Black",
        age       : 12
    };
    ```

## Virgules

- Virgules en début de ligne ? **NOPE**. eslint: [`comma-style`](http://eslint.org/docs/rules/comma-style.html)

    ```javascript
    // bad
    const story = [
        once
      , upon
      , aTime
    ];

    // good
    const story = [
        once,
        upon,
        aTime,
    ];

    // bad
    const hero = {
        firstName   : 'Ada'
      , lastName    : 'Lovelace'
      , birthYear   : 1815
      , superPower  : 'computers'
    };

    // good
    const hero = {
        firstName   : 'Ada',
        lastName    : 'Lovelace',
        birthYear   : 1815,
        superPower  : 'computers',
    };
    ```

- Mettre une virgule en fin d'objet/array. eslint: [`comma-dangle`](http://eslint.org/docs/rules/comma-dangle.html)

    > Cela conduit à des différences de git plus simples. En outre, les transpilers comme Babel supprimeront la virgule de fin de traînée dans le code transpillé qui signifie que vous n'avez pas à vous soucier du [problème de dernière virgule] (https://github.com/airbnb/javascript/blob/es5-deprecated/es5/README.md#commas) sur les navigateurs.

    ```diff
    // bad - git diff without trailing comma
    const hero = {
         firstName: 'Florence',
    -    lastName: 'Nightingale'
    +    lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing']
    };

    // good - git diff with trailing comma
    const hero = {
         firstName: 'Florence',
         lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing'],
    };
    ```

    ```javascript
    // bad
    const hero = {
        firstName   : 'Dana',
        lastName    : 'Scully'
    };

    const heroes = [
        'Batman',
        'Superman'
    ];

    // good
    const hero = {
        firstName   : 'Dana',
        lastName    : 'Scully',
    };

    const heroes = [
        'Batman',
        'Superman',
    ];

    // bad
    function createHero(
        firstName,
        lastName,
        inventorOf
    ) {
        // does nothing
    }

    // good
    function createHero(
        firstName,
        lastName,
        inventorOf,
    ) {
        // does nothing
    }

    // good (note that a comma must not appear after a "rest" element)
    function createHero(
        firstName,
        lastName,
        inventorOf,
        ...heroArgs
    ) {
        // does nothing
    }

    // bad
    createHero(
        firstName,
        lastName,
        inventorOf
    );

    // good
    createHero(
        firstName,
        lastName,
        inventorOf,
    );

    // good (note that a comma must not appear after a "rest" element)
    createHero(
        firstName,
        lastName,
        inventorOf,
        ...heroArgs
    );
    ```

## Points-virgules

- **Obligatoire en fin d'un statement** (si elles existent c'est pour une bonne raison). eslint: [`semi`](http://eslint.org/docs/rules/semi.html)

    ```javascript
    // bad
    (function () {
        const name = 'Skywalker'
        return name
    })()

    // good
    (function () {
        const name = 'Skywalker';
        return name;
    }());

    // good, but legacy (guards against the function becoming an argument when two files with IIFEs are concatenated)
    ;((() => {
        const name = 'Skywalker';
        return name;
    })());
    ```

## Type Casting & Coercion

- Effectuer la coercition de type au début de la déclaration.

- Strings:

    ```javascript
    // => this.reviewScore = 9;

    // bad
    const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

    // bad
    const totalScore = this.reviewScore.toString(); // isn't guaranteed to return a string

    // good
    const totalScore = String(this.reviewScore);
    ```

- Nombres. Selon les cas, utilisez l'opérateur `+` ou bien `parseInt` en précisant **obligatoirement** sa base de conversion. Privilégiez ce dernier le plus possible. eslint: [`radix`](http://eslint.org/docs/rules/radix)

    ```javascript
    const inputValue = '4';

    // bad
    const val = new Number(inputValue);

    // good
    const val = +inputValue;

    // bad
    const val = inputValue >> 0;

    // bad
    const val = parseInt(inputValue);

    // good
    const val = Number(inputValue);

    // good
    const val = parseInt(inputValue, 10);
    ```

- Si pour une raison ou pour une autre, vous faites un traitement contenant un `parseInt` et que celui-ci vous ralenti fortement votre traitement, dans ce cas vous pouvez utiliser le décallage de bits. Mais uniquement pour des [raisons de performance](https://jsperf.com/coercion-vs-casting/3). Dans ce cas, laissez un commentaire expliquant pourquoi vous faites ça.

    ```javascript
    // good
    /**
     * parseInt was the reason my code was slow.
     * Bitshifting the String to coerce it to a
     * Number made it a lot faster.
     */
    const val = inputValue >> 0;
    ```

- **Note** : Faites très attention lors de l'utilisation des décallages de bits. Les nombres sont représentés sur [64-bit](https://es5.github.io/#x4.3.19). Le décallage de bits retourne **toujours** des nombres représentés sur **32 bits**  ([source](https://es5.github.io/#x11.7)). Ceci peut entraîner des conversions erronées et non prévues pour les nombres plus larges que 32 bits. [Discussion](https://github.com/airbnb/javascript/issues/109). Le plus grand nombre signé sur 32 bits est de 2147483647 :

    ```javascript
    2147483647 >> 0; // => 2147483647
    2147483648 >> 0; // => -2147483648
    2147483649 >> 0; // => -2147483647
    ```

- Booléens :

    ```javascript
    const age = 0;

    // bad
    const hasAge = new Boolean(age);

    // good
    const hasAge = Boolean(age);

    // best
    const hasAge = !!age;
    ```

## Convention de nommage

- Évitez les noms composés d'une seule lettre. Soyez descriptif avec votre nom. eslint: [`id-length`](http://eslint.org/docs/rules/id-length)

    ```javascript
    // bad
    function q() {
        // ...
    }

    // good
    function query() {
        // ...
    }
    ```

- Utilisez le camelCase quand vous nommez des objets, functions et instances. eslint: [`camelcase`](http://eslint.org/docs/rules/camelcase.html)

    ```javascript
    // bad
    const OBJEcttsssss = {};
    const this_is_my_object = {};
    function c() {}

    // good
    const thisIsMyObject = {};
    function thisIsMyFunction() {}
    ```

- Utilisez le PascalCase uniquement pour nommer vos constructeurs et classes. eslint: [`new-cap`](http://eslint.org/docs/rules/new-cap.html)

    ```javascript
    // bad
    function user(options) {
        this.name = options.name;
    }

    const bad = new user({
        name: 'nope',
    });

    // good
    class User {
        constructor(options) {
            this.name = options.name;
        }
    }

    const good = new User({
        name : 'yup',
    });
    ```

- N'utilisez pas les traits d'union et les underscore. eslint: [`no-underscore-dangle`](http://eslint.org/docs/rules/no-underscore-dangle.html)

    > JavaScript n'a pas le concept de choses privées en termes de propriétés ou de méthodes. Bien qu'un underscore en début de nom est une convention commune pour signifier "privé", en fait, ces propriétés sont pleinement publiques, et comme tel, font partie de votre API public. Cette convention pourrait conduire les développeurs à penser à tort qu'une modification ne sera pas considérée comme rupture, ou que des tests ne sont pas nécessaires. Tl; dr: si vous voulez que quelque chose soit «privé», il ne doit pas être présent.

    ```javascript
    // bad
    this.__firstName__ = 'Panda';
    this.firstName_ = 'Panda';
    this._firstName = 'Panda';

    // good
    this.firstName = 'Panda';
    ```

- Ne sauvegardez pas la référence de `this`. Utilisez les fonctions fléchées ou bien [Function#bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

    ```javascript
    // bad
    function foo() {
        const self = this;
        return function () {
            console.log(self);
        };
    }

    // bad
    function foo() {
        const that = this;
        return function () {
            console.log(that);
        };
    }

    // good
    function foo() {
        return () => {
            console.log(this);
        };
    }
    ```

- Le nom du fichier doit correspondre au nom de la variable pour son export par défaut.

    ```javascript
    // file 1 contents
    class CheckBox {
      // ...
    }
    export default CheckBox;

    // file 2 contents
    export default function fortyTwo() { return 42; }

    // file 3 contents
    export default function insideDirectory() {}

    // in some other file
    // bad
    import CheckBox from './checkBox'; // PascalCase import/export, camelCase filename
    import FortyTwo from './FortyTwo'; // PascalCase import/filename, camelCase export
    import InsideDirectory from './InsideDirectory'; // PascalCase import/filename, camelCase export

    // bad
    import CheckBox from './check_box'; // PascalCase import/export, snake_case filename
    import forty_two from './forty_two'; // snake_case import/filename, camelCase export
    import inside_directory from './inside_directory'; // snake_case import, camelCase export
    import index from './inside_directory/index'; // requiring the index file explicitly
    import insideDirectory from './insideDirectory/index'; // requiring the index file explicitly

    // good
    import CheckBox from './CheckBox'; // PascalCase export/import/filename
    import fortyTwo from './fortyTwo'; // camelCase export/import/filename
    import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit "index"
    // ^ supports both insideDirectory.js and insideDirectory/index.js
    ```

- Utilisez le camelCase quand le `export default` est pour une fonction. Votre fichier nom de fichier doit être identique à votre fonction

    ```javascript
    function makeStyleGuide() {
        // ...
    }

    export default makeStyleGuide;
    ```

- Utilisez le PascalCase quand le `export default` est pour un constructor / classes / singleton / constante

    ```javascript
    const AirbnbStyleGuide = {
        es6: {
        },
    };

    export default AirbnbStyleGuide;
    ```

- Les acronymes et les initialismes doivent toujours être en majuscules ou entièrement en minuscules.

    ```javascript
    // bad
    import SmsContainer from './containers/SmsContainer';

    // bad
    const HttpRequests = [
        // ...
    ];

    // good
    import SMSContainer from './containers/SMSContainer';

    // good
    const HTTPRequests = [
        // ...
    ];

    // best
    import TextMessageContainer from './containers/TextMessageContainer';

    // best
    const Requests = [
        // ...
    ];
    ```

## Accessors

- Les fonctions d'accesseur pour les propriétés ne sont pas requises.
- N'utilisez pas les getters / setters JavaScript car ils provoquent des effets secondaires inattendus et sont plus difficiles à tester, à maintenir et à raisonner. Au lieu de cela, si vous faites des fonctions d'accesseur, utilisez `getVal()` et `setVal('bonjour')`.

    ```javascript
    // bad
    class Dragon {
        get age() {
            // ...
        }
        set age(value) {
            // ...
        }
    }

    // good
    class Dragon {
        getAge() {
            // ...
        }
        setAge(value) {
            // ...
        }
    }
    ```

- Si la propriété est un booléen, utilisez `isVal()` ou `hasVal()`

    ```javascript
    // bad
    if (!dragon.dead()) {
        return false;
    }

    // good
    if (!dragon.isDead()) {
        return false;
    }
    ```

- Vous pouvez très bien utiliser les fonctions `get()` et `set()` mais soyez cohérents.

    ```javascript
    class Jedi {
        constructor(options = {}) {
            const lightsaber = options.lightsaber || 'blue';
            this.set('lightsaber', lightsaber);
        }
        set(key, val) {
            this[key] = val;
        }
        get(key) {
            return this[key];
        }
    }
    ```

## Events

- Quand vous attachez des paramètres à des événements (événements VueJS, ReactJS ou NodeJS), passez par un objet plutôt que par la valeur brute. Cela permet d'ajouter plus facilement d'autres paramètres à cette fonction sans devoir tout reprendre. Par exemple, au lieux de faire :

    ```javascript
    this.emit('listingUpdated', listing.id);

    // ...

    this.on('listingUpdated', (listingId) => {
        // do something with listingId
    });
    ```

    préférez :

    ```javascript
    this.emit('listingUpdated', {
        listingId : listing.id
    });

    // ...

    this.on('listingUpdated', (data) => {
        // do something with listingId
    });
    ```

## jQuery

- **Ne plus jamais utiliser jQuery dans vos projets ni de library externes l'utilisant**. Pour le front, les nouveaux frameworks font le job sans nécessairement inclure jQuery. De plus, lors de la compilation, vous risquez d'avoir des library qui ont jQuery dans différentes versions et cela peut entraîner des erreurs d'exécution car la compilation retournera différentes occurences de jQuery.

## VueJS

- Utilisation des règles de `plugin:vue/recommended` : [*Voir les règles*](https://github.com/vuejs/eslint-plugin-vue#priority-c-recommended-minimizing-arbitrary-choices-and-cognitive-overhead) mais avec des changements minimes :

- Surcharge de la rules `vue/html-indent`. L'espacement dans le tag `template` est de 4 espaces :

    ```vue
    // bad
    <template>
      <div class="item">
        <span>Contenu du span</span>
      </div>
    </template>

    // good
    <template>
        <div class="item">
            <span>Contenu du span</span>
        </div>
    </template>
    ```

-  Surcharge de la rules `vue/html-indent`. Les attributs ne doivent pas être alignés verticalement sur le premier attribut dans le cas de plusieurs lignes.

    ```vue
    // good
    <div id=""
        class=""
        some-attr=""
    />
    ```


## Performance

- [On Layout & Web Performance](https://www.kellegous.com/j/2013/01/26/layout-performance/)
- [String vs Array Concat](https://jsperf.com/string-vs-array-concat/2)
- [Try/Catch Cost In a Loop](https://jsperf.com/try-catch-in-loop-cost)
- [Bang Function](https://jsperf.com/bang-function)
- [jQuery Find vs Context, Selector](https://jsperf.com/jquery-find-vs-context-sel/13)
- [innerHTML vs textContent for script text](https://jsperf.com/innerhtml-vs-textcontent-for-script-text)
- [Long String Concatenation](https://jsperf.com/ya-string-concat)
- [Are Javascript functions like `map()`, `reduce()`, and `filter()` optimized for traversing arrays?](https://www.quora.com/JavaScript-programming-language-Are-Javascript-functions-like-map-reduce-and-filter-already-optimized-for-traversing-array/answer/Quildreen-Motta)
- Loading...

## Resources

**Learning ES6**

- [Draft ECMA 2015 (ES6) Spec](https://people.mozilla.org/~jorendorff/es6-draft.html)
- [ExploringJS](http://exploringjs.com/)
- [ES6 Compatibility Table](https://kangax.github.io/compat-table/es6/)
- [Comprehensive Overview of ES6 Features](http://es6-features.org/)

**Read This**

- [Standard ECMA-262](http://www.ecma-international.org/ecma-262/6.0/index.html)

**Tools**

- Code Style Linters
  + [ESlint](http://eslint.org/) - [Airbnb Style .eslintrc](https://github.com/airbnb/javascript/blob/master/linters/.eslintrc)
  + [JSHint](http://jshint.com/) - [Airbnb Style .jshintrc](https://github.com/airbnb/javascript/blob/master/linters/.jshintrc)
  + [JSCS](https://github.com/jscs-dev/node-jscs) - [Airbnb Style Preset](https://github.com/jscs-dev/node-jscs/blob/master/presets/airbnb.json) (Deprecated, please use [ESlint](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base))
- Neutrino preset - [neutrino-preset-airbnb-base](https://neutrino.js.org/presets/neutrino-preset-airbnb-base/)

**Other Style Guides**

- [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
- [jQuery Core Style Guidelines](https://contribute.jquery.org/style-guide/js/)
- [Principles of Writing Consistent, Idiomatic JavaScript](https://github.com/rwaldron/idiomatic.js)

**Other Styles**

- [Naming this in nested functions](https://gist.github.com/cjohansen/4135065) - Christian Johansen
- [Conditional Callbacks](https://github.com/airbnb/javascript/issues/52) - Ross Allen
- [Popular JavaScript Coding Conventions on GitHub](http://sideeffect.kr/popularconvention/#javascript) - JeongHoon Byun
- [Multiple var statements in JavaScript, not superfluous](http://benalman.com/news/2012/05/multiple-var-statements-javascript/) - Ben Alman

**Further Reading**

- [Understanding JavaScript Closures](https://javascriptweblog.wordpress.com/2010/10/25/understanding-javascript-closures/) - Angus Croll
- [Basic JavaScript for the impatient programmer](http://www.2ality.com/2013/06/basic-javascript.html) - Dr. Axel Rauschmayer
- [You Might Not Need jQuery](http://youmightnotneedjquery.com/) - Zack Bloom & Adam Schwartz
- [ES6 Features](https://github.com/lukehoban/es6features) - Luke Hoban
- [Frontend Guidelines](https://github.com/bendc/frontend-guidelines) - Benjamin De Cock

**Books**

- [JavaScript: The Good Parts](https://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742) - Douglas Crockford
- [JavaScript Patterns](https://www.amazon.com/JavaScript-Patterns-Stoyan-Stefanov/dp/0596806752) - Stoyan Stefanov
- [Pro JavaScript Design Patterns](https://www.amazon.com/JavaScript-Design-Patterns-Recipes-Problem-Solution/dp/159059908X)  - Ross Harmes and Dustin Diaz
- [High Performance Web Sites: Essential Knowledge for Front-End Engineers](https://www.amazon.com/High-Performance-Web-Sites-Essential/dp/0596529309) - Steve Souders
- [Maintainable JavaScript](https://www.amazon.com/Maintainable-JavaScript-Nicholas-C-Zakas/dp/1449327680) - Nicholas C. Zakas
- [JavaScript Web Applications](https://www.amazon.com/JavaScript-Web-Applications-Alex-MacCaw/dp/144930351X) - Alex MacCaw
- [Pro JavaScript Techniques](https://www.amazon.com/Pro-JavaScript-Techniques-John-Resig/dp/1590597273) - John Resig
- [Smashing Node.js: JavaScript Everywhere](https://www.amazon.com/Smashing-Node-js-JavaScript-Everywhere-Magazine/dp/1119962595) - Guillermo Rauch
- [Secrets of the JavaScript Ninja](https://www.amazon.com/Secrets-JavaScript-Ninja-John-Resig/dp/193398869X) - John Resig and Bear Bibeault
- [Human JavaScript](http://humanjavascript.com/) - Henrik Joreteg
- [Superhero.js](http://superherojs.com/) - Kim Joar Bekkelund, Mads Mobæk, & Olav Bjorkoy
- [JSBooks](http://jsbooks.revolunet.com/) - Julien Bouquillon
- [Third Party JavaScript](https://www.manning.com/books/third-party-javascript) - Ben Vinegar and Anton Kovalyov
- [Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript](http://amzn.com/0321812182) - David Herman
- [Eloquent JavaScript](http://eloquentjavascript.net/) - Marijn Haverbeke
- [You Don't Know JS: ES6 & Beyond](http://shop.oreilly.com/product/0636920033769.do) - Kyle Simpson

**Blogs**

- [JavaScript Weekly](http://javascriptweekly.com/)
- [JavaScript, JavaScript...](https://javascriptweblog.wordpress.com/)
- [Bocoup Weblog](https://bocoup.com/weblog)
- [Adequately Good](http://www.adequatelygood.com/)
- [NCZOnline](https://www.nczonline.net/)
- [Perfection Kills](http://perfectionkills.com/)
- [Ben Alman](http://benalman.com/)
- [Dmitry Baranovskiy](http://dmitry.baranovskiy.com/)
- [Dustin Diaz](http://dustindiaz.com/)
- [nettuts](http://code.tutsplus.com/?s=javascript)

**Podcasts**

- [JavaScript Air](https://javascriptair.com/)
- [JavaScript Jabber](https://devchat.tv/js-jabber/)
