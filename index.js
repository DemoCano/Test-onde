const express = require('express');
const { resolve, join } = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static(join(__dirname, 'public')));

const PORT = 3001;

let customers = [];
const postAddCustomer = (req, res, next) => {
  customers = [
    ...customers,
    {
      id: uuidv4(),
      email: req.body.email,
    },
  ];
  //   console.log({ customers });

  return res.render(resolve(__dirname, './views/customer/customer.ejs'), {
    pageTitle: 'Customer',
    customers: [
      ...customers,
      {
        email: req.body.email,
      },
    ],
  });
};

const getCustomers = (req, res, next) => {
  return res.render(resolve(__dirname, './views/customer/customer.ejs'), {
    pageTitle: 'Customer',
    customers: [],
  });
};

const postEditCustomer = (req, res, next) => {
  return res.render('customer/add-customer', {
    pageTitle: 'Add customer',
  });
};

const postDeleteCustomer = (req, res, next) => {
  console.log(req.body, '>>>>>>>>>>>>>>>>>');
  const { customerId } = req.body;
  customers = customers.filter((c) => c.id !== customerId);
  return res.render(resolve(__dirname, './views/customer/add-customer.ejs'), {
    pageTitle: 'Customer',
    customers,
  });
};

const getAddCustomer = (req, res, next) => {
  return res.render(resolve(__dirname, './views/customer/add-customer.ejs'), {
    pageTitle: 'Customer',
  });
};

app.get('/add-customer', getAddCustomer);
app.post('/customer/add-customer', postAddCustomer);
app.get('/customers', getCustomers);
app.post('/edit-customer', postEditCustomer);
app.post('/delete-customer', postDeleteCustomer);

app.listen(PORT, () => console.log('App running'));
