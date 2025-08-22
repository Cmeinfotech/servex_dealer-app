import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import APIS from "../../api/Api";
import { IMAGES } from "../../assets/Images";
import { authStyle } from "../../assets/styles/auth.style";
import { COLORS } from "../../constants/colors";
import { scale } from "../../constants/constants";
import Toast from "../../src/components/toast/Toast";
import Button from "../../src/components/ui/Button";
import DynamicText from "../../src/components/ui/DynamicText";
import Input from "../../src/components/ui/Input";
import { storeData } from "../../src/hooks/asynStorageHooks";
import { useStore } from "../../src/hooks/store";

const SignInScreen = () => {
  const router = useRouter();
  const toastRef = useRef();
  const { setAccessToken } = useStore((state) => state);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleLogin = async () => {
    let newErrors = {};

    if (!emailId.trim()) {
      newErrors.emailId = "Please enter your email";
    } else if (!/^\S+@\S+\.\S+$/.test(emailId)) {
      newErrors.emailId = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Please enter your password";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    Keyboard.dismiss();
    setLoading(true);

    try {
      const res = await APIS.signIn({
        email: emailId,
        password,
      });

      if (res?.status === true) {
        await storeData("userDetail", res?.dealer ?? {});
        await storeData("accessToken", res?.token ?? "");
        await storeData("userLogin", true);

        setAccessToken(res?.token ?? "");

        toastRef.current?.show("Login successful");
        router.replace("/location");
      } else {
        toastRef.current?.show(res?.message || "Login failed please try again");
      }
    } catch (error) {
      console.log(error);
      toastRef.current.show(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // const handleLogin = async () => {
  //   router.replace("/(auth)/location");
  // };

  const handleRegister = () => {
    router.push("/(auth)/sign-up");
  };

  return (
    <ImageBackground
      source={IMAGES.backgroundImage}
      style={authStyle.backgroundImage}
      resizeMode="cover"
    >
      <View style={authStyle.overlay} />
      <KeyboardAvoidingView
        style={authStyle.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={authStyle.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={authStyle.card}>
              <Text style={authStyle.heading}>Welcome Back 👋</Text>

              <Input
                placeholder="Email"
                value={emailId}
                onChangeText={setEmailId}
                keyboardType="email-address"
                autoCapitalize="none"
                inputMode="email"
                error={errors.emailId}
              />

              <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                secureText={!showPassword}
                onPassPress={() => setShowPassword(!showPassword)}
                password
                error={errors.password}
              />

              <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                <Text style={authStyle.forgotPass}>Forgot password?</Text>
              </TouchableOpacity>

              <Button
                style={{ paddingVertical: scale(14), marginTop: scale(12) }}
                onPress={handleLogin}
                isLoading={loading}
                disabled={loading}
              >
                Log In
              </Button>

              <View style={authStyle.bottomTextRow}>
                <DynamicText size={scale(12)} weight="bold">
                  New here?
                </DynamicText>
                <TouchableOpacity
                  style={{ paddingLeft: scale(6) }}
                  onPress={handleRegister}
                >
                  <DynamicText
                    size={scale(12)}
                    weight="bold"
                    color={COLORS.primary}
                  >
                    Create Account
                  </DynamicText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Toast
        ref={toastRef}
        position="top"
        duration={3000}
        icon={false}
        textCenter
        style={{ backgroundColor: COLORS.modalBackground }}
      />
    </ImageBackground>
  );
};

export default SignInScreen;
