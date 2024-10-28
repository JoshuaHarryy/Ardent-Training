import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';



export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ userData }) => {
    console.log("Abc user data:", userData)
    try {
      const response = await fetch('https://staging.ardent-training.com/api/student-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "api-key": "eyJpdiI6ImpDdHdQL0NHYzVNQmwwYmE0NFMxbnc9PSIsInZhbHVlIjoiRmZPN2poWjg4OHJkR2xjOGg5SDgwSmg5M0lXMUhXeFhzbUJZZ05hT21MMmd1TUlpUlhEMWo1ekJXU1dTMThnT0szYTlMSlQva3BoODc3cDJhS2sxZE5KMDhyR1U0VlhoSUp1Z3pVSEwydk9KZHpYbWg5SjNjUjdoVFZFem51UFlRK28yemRVZ2NxWVYvVEJTSHZNWEJROXM4NnFubFVaU09UNDZYWSs4REpvYVdjdldaWVFYYlpPZFlpOWc0Z2cvSHA0YXlQMWVJMWlSeEFWakU2TzVyTXljM0xsMmVtMm5lLzMwWlZEbUlCZER3REZMWko0dTNPZGFSak5LRkdFNCIsIm1hYyI6IjIxYzNkNTM3MjVhOGVkN2Q5YjFjMDU2ZjYwM2QzM2MxMzVkYWIzODEwYmEyZDg1ODJiZjViMzUzZmU5NDBmYmIiLCJ0YWciOiIifQ==",
        },
        body: JSON.stringify(userData),
      }).then(response => response.json())
        .then(json => {
          return json;
        })

      // const data = await response.json();
      // if(response.ok)
      // {
      //   Alert.alert('Registration successful')
      //   console.log(data)
      // }
    } catch {
      console.log('Try failed')
    }
  }
)


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, navigation }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch("https://staging.ardent-training.com/api/student-login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'eyJpdiI6ImpDdHdQL0NHYzVNQmwwYmE0NFMxbnc9PSIsInZhbHVlIjoiRmZPN2poWjg4OHJkR2xjOGg5SDgwSmg5M0lXMUhXeFhzbUJZZ05hT21MMmd1TUlpUlhEMWo1ekJXU1dTMThnT0szYTlMSlQva3BoODc3cDJhS2sxZE5KMDhyR1U0VlhoSUp1Z3pVSEwydk9KZHpYbWg5SjNjUjdoVFZFem51UFlRK28yemRVZ2NxWVYvVEJTSHZNWEJROXM4NnFubFVaU09UNDZYWSs4REpvYVdjdldaWVFYYlpPZFlpOWc0Z2cvSHA0YXlQMWVJMWlSeEFWakU2TzVyTXljM0xsMmVtMm5lLzMwWlZEbUlCZER3REZMWko0dTNPZGFSak5LRkdFNCIsIm1hYyI6IjIxYzNkNTM3MjVhOGVkN2Q5YjFjMDU2ZjYwM2QzM2MxMzVkYWIzODEwYmEyZDg1ODJiZjViMzUzZmU5NDBmYmIiLCJ0YWciOiIifQ==',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result.message || 'Login failed');
      }


      await AsyncStorage.setItem('token', result.token);

      
      console.log('Login successful')
      // navigation.navigate('HomeDrawer');
      dispatch(checkToken());
      return result;
    } catch (error) {
      return rejectWithValue(error.message || 'An unexpected error occurred');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      
      await AsyncStorage.removeItem('token');
      dispatch(checkToken());
      return; 
    } catch (error) {
      return rejectWithValue(error.message || 'An unexpected error occurred');
    }
  }
);


export const checkToken = createAsyncThunk(
  'auth/checkToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token'); 

      if (token) {
        console.log('Token got from AsyncStorage:', token);
        return { token };  
      } else {
        console.log('No token found');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'An unexpected error occurred');
    }
  }
);

export const fetchStudentProfile = createAsyncThunk(
  'auth/fetchStudentProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);  

      const response = await fetch('https://staging.ardent-training.com/api/student-profile', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'api-key': 'eyJpdiI6ImpDdHdQL0NHYzVNQmwwYmE0NFMxbnc9PSIsInZhbHVlIjoiRmZPN2poWjg4OHJkR2xjOGg5SDgwSmg5M0lXMUhXeFhzbUJZZ05hT21MMmd1TUlpUlhEMWo1ekJXU1dTMThnT0szYTlMSlQva3BoODc3cDJhS2sxZE5KMDhyR1U0VlhoSUp1Z3pVSEwydk9KZHpYbWg5SjNjUjdoVFZFem51UFlRK28yemRVZ2NxWVYvVEJTSHZNWEJROXM4NnFubFVaU09UNDZYWSs4REpvYVdjdldaWVFYYlpPZFlpOWc0Z2cvSHA0YXlQMWVJMWlSeEFWakU2TzVyTXljM0xsMmVtMm5lLzMwWlZEbUlCZER3REZMWko0dTNPZGFSak5LRkdFNCIsIm1hYyI6IjIxYzNkNTM3MjVhOGVkN2Q5YjFjMDU2ZjYwM2QzM2MxMzVkYWIzODEwYmEyZDg1ODJiZjViMzUzZmU5NDBmYmIiLCJ0YWciOiIifQ==' 
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch profile');
      }

      const data = await response.json();  
      console.log('Profile Data:', data);
      return data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.message || 'An unexpected error occurred');
    }
  }
);

export const saveAddressDetails = createAsyncThunk(
  'auth/saveAddressDetails',
  async ({ addressData }, { rejectWithValue }) => {
    console.log("addressData = ", addressData);
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("token = ", token); // Check if token is retrieved correctly

      const response = await fetch('https://staging.ardent-training.com/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'api-key': 'eyJpdiI6ImpDdHdQL0NHYzVNQmwwYmE0NFMxbnc9PSIsInZhbHVlIjoiRmZPN2poWjg4OHJkR2xjOGg5SDgwSmg5M0lXMUhXeFhzbUJZZ05hT21MMmd1TUlpUlhEMWo1ekJXU1dTMThnT0szYTlMSlQva3BoODc3cDJhS2sxZE5KMDhyR1U0VlhoSUp1Z3pVSEwydk9KZHpYbWg5SjNjUjdoVFZFem51UFlRK28yemRVZ2NxWVYvVEJTSHZNWEJROXM4NnFubFVaU09UNDZYWSs4REpvYVdjdldaWVFYYlpPZFlpOWc0Z2cvSHA0YXlQMWVJMWlSeEFWakU2TzVyTXljM0xsMmVtMm5lLzMwWlZEbUlCZER3REZMWko0dTNPZGFSak5LRkdFNCIsIm1hYyI6IjIxYzNkNTM3MjVhOGVkN2Q5YjFjMDU2ZjYwM2QzM2MxMzVkYWIzODEwYmEyZDg1ODJiZjViMzUzZmU5NDBmYmIiLCJ0YWciOiIifQ==', // Make sure the key is correct
        },
        body: JSON.stringify(addressData),
      });

      console.log("Response status: ", response.status); // Log status code
      console.log("Response OK: ", response.ok); // Log if response is OK

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error Data: ", errorData); 
        return rejectWithValue(errorData.message || 'Failed to save address');
      }

      const data = await response.json();
      console.log("Success Data: ", data); 
      return data; 
    } catch (error) {
      console.log("Error: ", error.message); // Log any other errors
      return rejectWithValue(error.message || 'An unexpected error occurred');
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    status: 'idle',
    error: null,
    loading: false,
    profile: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null; 
        state.user = null; 
        state.error = null; 
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchStudentProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload; 
      })
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      .addCase(checkToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        console.log('Check token fulfilled, token:', action.payload?.token); 
        state.token = action.payload?.token || null;
        state.loading = false;
      })
      .addCase(checkToken.rejected, (state, action) => {
        console.log('Check token rejected:', action.payload);
        state.token = null;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveAddressDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveAddressDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = { ...state.profile, address: action.payload }; // Update address in profile
      })
      .addCase(saveAddressDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default authSlice.reducer;